import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {getAuth} from "@angular/fire/auth";
import {Card} from "../models/discount-card.model";
import {map, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {ListItem} from "../models/list-item.model";

@Injectable()
export class BaseApi {

    private uID = getAuth().currentUser.uid;

    constructor(public http: HttpClient) {
    }

    create(item: any, items: string): Observable<any> {
        return this.http.post(`${environment.fbDbUrl}/users/${this.uID}/${items}.json`, item)
            .pipe(map((response: { name?: string }) => {
                return {
                    ...item,
                    id: response.name,
                    date: new Date(item.date)
                }
            }))
    }

    getAll(items: string): Observable<any[]> | null {
        return this.http.get(`${environment.fbDbUrl}/users/${this.uID}/${items}.json`)
            .pipe(map((response: { [key: string]: any }) => {
                if (response) {
                    return Object
                        .keys(response)
                        .map(key => ({
                            ...response[key],
                            id: key,
                            date: new Date(response[key].date)
                        }))

                } else {
                    return null
                }
            }))
    }

    getById(id: string, items: string): Observable<any> {
        return this.http.get<ListItem>(`${environment.fbDbUrl}/users/${this.uID}/${items}/${id}.json`)
            .pipe(map((item: any) => {
                return {
                    ...item,
                    id,
                    date: new Date(item.date)
                }
            }))
    }

    update(item: ListItem): Observable<ListItem> {
        return this.http.patch<ListItem>(`${environment.fbDbUrl}/users/${this.uID}/items/${item.id}.json`, item)
    }

    remove(id: string, items: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/users/${this.uID}/${items}/${id}.json`)
    }

}
