import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ListItem} from "../models/list-item.model";
import {map, Observable, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {getAuth} from "@angular/fire/auth";
import {Card} from "../models/discount-card.model";
import {BaseApi} from "../core/base-api";

@Injectable({
    providedIn: 'root'
})
export class ListItemService extends BaseApi{

    item: string = 'items'

    constructor(public override http: HttpClient) {
        super(http)
    }

    createCard(listItem: ListItem):Observable<ListItem>{
        return this.create(listItem, this.item)
    }
    getAllItems(): Observable<ListItem[]> | null{
        return this.getAll(this.item)
    }

    getByItemId(id: string): Observable<ListItem>{
        return this.getById(id,this.item)
    }

    changeStatus(item:ListItem):Observable<ListItem>{
        return this.update(item)
    }

    removeItem(id: string): Observable<void>{
        return this.remove(id, this.item)
    }
}
