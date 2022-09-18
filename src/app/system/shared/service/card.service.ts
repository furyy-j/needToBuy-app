import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Card} from "../models/discount-card.model";
import {BaseApi} from "../core/base-api";
import {ListItem} from "../models/list-item.model";

@Injectable({
    providedIn: 'root'
})
export class CardService extends BaseApi {

    private item: string = 'cards'

    constructor(public override http: HttpClient) {
        super(http)
    }

    createCard(card: Card): Observable<Card> {
        return this.create(card, this.item)
    }

    getAllCards(): Observable<Card[]> | null {
        return this.getAll(this.item)
    }
    getByCardId(id: string): Observable<Card>{
        return this.getById(id,this.item)
    }

    removeCard(id: string): Observable<void> {
        return this.remove(id, this.item)
    }
}
