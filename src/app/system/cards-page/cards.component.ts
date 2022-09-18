import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    Component,
    DoCheck,
    OnChanges,
    OnDestroy,
    OnInit
} from '@angular/core';
import {Subscription} from "rxjs";
import {Card} from "../shared/models/discount-card.model";
import {CardService} from "../shared/service/card.service";
import {AlertService} from "../shared/service/alert.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-cards-page',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})


export class CardsComponent implements OnInit, OnDestroy {

    isModalVisible = false;
    cards: Card[];

    sub1$: Subscription;
    sub2$: Subscription;
    sub3$: Subscription;

    isEmpty = false;
    isLoading = true;

    constructor(private cardService: CardService,
                private alert: AlertService,
                private title: Title) {
        title.setTitle('Cards | NeedToBuy');
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

    remove(id: string,$event:MouseEvent) {
        $event.stopPropagation();
        this.sub2$ = this.cardService.removeCard(id).subscribe(() => {
            this.cards = this.cards.filter(item => item.id !== id)
            this.alert.danger('Карта была удалена')
        })
        if (this.cards.length == 1) {
            this.isEmpty = true
        }
    }

    onRefresh(){
        if(this.cards){this.isEmpty = false}
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
