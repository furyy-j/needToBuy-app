import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Card} from "../shared/models/discount-card.model";
import {CardService} from "../shared/service/card.service";
import {AlertService} from "../shared/service/alert.service";

@Component({
    selector: 'app-coupens-page',
    templateUrl: './coupens.component.html',
    styleUrls: ['./coupens.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})


export class CoupensComponent implements OnInit, OnDestroy {

    isModalVisible = false;
    cards: Card[];

    sub1$: Subscription;
    sub2$: Subscription;
    sub3$: Subscription;

    isEmpty = false;
    isLoading = true;

    constructor(private cardService: CardService,
                private alert: AlertService) {
    }

    private toggleModalVisibility(dir: boolean) {
        this.isModalVisible = dir;
    }

    openModal() {
        this.toggleModalVisibility(true);
    }
    onModalCancel() {
        this.toggleModalVisibility(false);
    }

    ngOnInit(): void {
        this.sub1$ = this.cardService.getAllCards().subscribe(items => {
            if (!items) {
                this.isEmpty = true
            }
            this.isLoading = false;
            this.cards = items;
        })
    }

    remove(id: string) {
        this.sub2$ = this.cardService.remove(id).subscribe(() => {
            this.cards = this.cards.filter(item => item.id !== id)
            this.alert.danger('Карта была удалена')
        })
        if (this.cards.length == 1) {
            this.isEmpty = true
        }
    }

    onRefresh(){
        this.isLoading = true;
        this.sub3$ = this.cardService.getAllCards().subscribe(items => {
            if (!items) {
                this.isEmpty = true
            }
            this.isLoading = false;
            this.cards = items;
        })
    }

    ngOnDestroy() {
        if(this.sub1$){this.sub1$.unsubscribe()}
        if(this.sub2$){this.sub2$.unsubscribe()}
        if(this.sub3$){this.sub3$.unsubscribe()}
    }
}
