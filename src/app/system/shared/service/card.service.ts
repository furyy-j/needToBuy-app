import { Injectable } from '@angular/core';
import {ListItem} from "../models/list-item.model";
import {map, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {getAuth} from "@angular/fire/auth";
import {Card} from "../models/discount-card.model";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  uID = getAuth().currentUser.uid;

  constructor(private http: HttpClient) { }

  createCard(card: Card): Observable<Card> {
    return this.http.post(`${environment.fbDbUrl}/users/${this.uID}/cards.json`, card)
        .pipe(map((response: { name?: string }) => {
          return {
            ...card,
              id: response.name,
          }
        }))
  }

    getAllCards(): Observable<Card[]> | null{
        return this.http.get(`${environment.fbDbUrl}/users/${this.uID}/cards.json`)
            .pipe(map((response: {[key:string]: any})=>{
                if(response){
                    return Object
                        .keys(response)
                        .map(key=>({
                            ...response[key],
                            id: key,
                        }))

                }else{return null}}))
    }

    remove(id: string): Observable<void>{
        return this.http.delete<void>(`${environment.fbDbUrl}/users/${this.uID}/cards/${id}.json`)
    }
}
