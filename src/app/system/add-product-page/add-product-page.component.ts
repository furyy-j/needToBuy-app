import {Component, OnInit} from '@angular/core';
import {countType, priority} from "../shared/priority";
import {NgForm} from "@angular/forms";
import {ListItem} from "../shared/models/list-item.model";
import {ListItemService} from "../shared/service/list-item.service";
import {Message} from "../../shared/model/message.model";
import {AlertService} from "../shared/service/alert.service";


@Component({
    selector: 'app-add-product-page',
    templateUrl: './add-product-page.component.html',
    styleUrls: ['./add-product-page.component.scss'],
})
export class AddProductPageComponent implements OnInit {

    priority = priority;
    countType = countType;
    message!: Message;

    constructor(private listItemService: ListItemService,
                private alert: AlertService) {
    }

    ngOnInit() {
        this.message = new Message('success', '')
    }
    private showMessage(text: string) {
        this.message.text = text;
        window.setTimeout(() => this.message.text = '', 3000)
    }

    onSubmit(form: NgForm) {
        const listItem: ListItem = {
            title: form.value.title,
            description: form.value.description,
            priority: form.value.priority,
            amount: form.value.amount,
            countType: form.value.countType,
            date: new Date(),
            isCompleted: false,
        }
        this.listItemService.create(listItem).subscribe(() => {
            this.alert.success('Покупка добавлена в список')
            form.resetForm({ countType: 'шт',amount: '1' ,priority:'warning'})
        })
    }


}
