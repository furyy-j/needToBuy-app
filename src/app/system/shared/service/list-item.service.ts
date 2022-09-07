import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ListItem} from "../models/list-item.model";
import {map, Observable, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {getAuth} from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})
export class ListItemService {

    uID = getAuth().currentUser.uid;


    constructor(private http: HttpClient) {
    }

    create(listItem: ListItem): Observable<ListItem> {
        return this.http.post(`${environment.fbDbUrl}/users/${this.uID}/items.json`, listItem)
            .pipe(map((response: { name?: string }) => {
                return {
                    ...listItem,
                    id: response.name,
                    date: new Date(listItem.date)
                }
            }))
    }

    getAllItems(): Observable<ListItem[]> | null{
        return this.http.get(`${environment.fbDbUrl}/users/${this.uID}/items.json`)
            .pipe(map((response: {[key:string]: any})=>{
                if(response){
                return Object
                    .keys(response)
                    .map(key=>({
                        ...response[key],
                        id: key,
                        date: new Date(response[key].date)
                    }))

            }else{return null}}))
    }

    getById(id: string): Observable<ListItem>{
        return this.http.get<ListItem>(`${environment.fbDbUrl}/users/${this.uID}/items/${id}.json`)
            .pipe(map((listItem: ListItem)=> {
                return {
                    ...listItem,
                    id,
                    date: new Date(listItem.date)
                }
            }))

    }

    changeStatus(item:ListItem):Observable<ListItem>{
        return this.http.patch<ListItem>(`${environment.fbDbUrl}/users/${this.uID}/items/${item.id}.json`, item)
    }

    remove(id: string): Observable<void>{
        return this.http.delete<void>(`${environment.fbDbUrl}/users/${this.uID}/items/${id}.json`)
    }
}
