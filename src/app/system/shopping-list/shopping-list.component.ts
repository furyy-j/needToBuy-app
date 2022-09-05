import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ListItem} from "../shared/models/list-item.model";
import {ListItemService} from "../shared/service/list-item.service";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    subscr$: Subscription;
    subscr2$: Subscription;

    listItems: ListItem[];
    searchPlaceholder: any = 'Название';
    searchValue = '';
    searchField = 'title';

    reverse: boolean = false;


    constructor(private listService: ListItemService) {
    }

    ngOnInit(): void {
        this.subscr$ = this.listService.getAllItems().subscribe(items => {
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
        this.listService.changeStatus({
            ...item,
            isCompleted: !status
        }).subscribe()


    }

    remove(id: string) {
        this.subscr2$ = this.listService.remove(id).subscribe(() => {
            this.listItems = this.listItems.filter(item => item.id !== id)
            //this.alert.danger('Пост був удален')
        })
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
    }
}
