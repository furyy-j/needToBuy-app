import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ListItem} from "../shared/models/list-item.model";
import {ListItemService} from "../shared/service/list-item.service";
import {AlertService} from "../shared/service/alert.service";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {

    subscr$: Subscription;
    subscr2$: Subscription;
    subscr3$: Subscription;

    listItems: ListItem[] = [];
    searchPlaceholder: any = 'Название';
    searchValue = '';
    searchField = 'title';

    isLoading = true;
    isEmpty = false;

    reverse: boolean = false;


    constructor(private listService: ListItemService,
                private alert: AlertService) {
    }

    ngOnInit(): void {
        this.subscr$ = this.listService.getAllItems().subscribe(items => {
            if (!items) {
                this.isEmpty = true
            }
            this.isLoading = false;
            this.listItems = items;

        })

    }

    getPriorClass(item: ListItem) {
        return {
            'label': true,
            'label-danger': item.priority === 'danger',
            'label-success': item.priority === 'success',
            'label-warning': item.priority === 'warning'
        }
    }

    changeCriteria(field: string) {
        const namesMap: any = {
            title: 'Название',
            date: 'Дата',
            amount: 'Количество',

        };
        this.searchPlaceholder = namesMap[field];
        this.searchField = field;
    }

    updateStatus(item: ListItem, status: boolean, id: number) {
        this.listItems[id].isCompleted = !status;
        this.subscr3$ = this.listService.changeStatus({
            ...item,
            isCompleted: !status
        }).subscribe()
    }

    remove(id: string, $event: MouseEvent) {
        $event.stopPropagation();
        this.subscr2$ = this.listService.remove(id).subscribe(() => {
            this.listItems = this.listItems.filter(item => item.id !== id)
            this.alert.danger('Покупка была удалена')
        })
        console.log(this.listItems.length)
        if (this.listItems.length == 1) {
            this.isEmpty = true
        }
    }

    sort(key: string) {
        if (this.reverse && key == 'isCompleted') {
            this.listItems = this.listItems.sort((a, b) => +a.isCompleted - +b.isCompleted)
        } else if (!this.reverse && key == 'isCompleted') {
            this.listItems = this.listItems.sort((a, b) => +b.isCompleted - +a.isCompleted)
        } else if (this.reverse && key == 'data') {
            this.listItems = this.listItems.sort((a, b) => +b.date - +a.date)
        } else if (!this.reverse && key == 'data') {
            this.listItems = this.listItems.sort((a, b) => +a.date - +b.date)
        }
        this.reverse = !this.reverse;

    }

    ngOnDestroy() {
        if (this.subscr$) {
            this.subscr$.unsubscribe()
        }
        if (this.subscr2$) {
            this.subscr2$.unsubscribe()
        }
        if (this.subscr3$) {
            this.subscr3$.unsubscribe()
        }
    }
}
