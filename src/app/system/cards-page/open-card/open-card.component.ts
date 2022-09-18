import { Component, OnInit } from '@angular/core';
import {ListItem} from "../../shared/models/list-item.model";
import {Card} from "../../shared/models/discount-card.model";
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import {CardService} from "../../shared/service/card.service";

@Component({
  selector: 'app-open-card',
  templateUrl: './open-card.component.html',
  styleUrls: ['./open-card.component.scss']
})
export class OpenCardComponent implements OnInit {

  cardItem: Card;
  isLoaded = false;
  sub1: Subscription;

  constructor(private cardService: CardService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub1 = this.route.params
        .pipe(switchMap((params: Params) => {
              return this.cardService.getByCardId(params['id'])
            })
        ).subscribe(
            (item: Card) => {
              this.cardItem = item;
              this.isLoaded = true;

            })
  }

}
