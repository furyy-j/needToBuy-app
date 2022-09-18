import {Component, OnInit} from '@angular/core';
import {countType, priority} from "../shared/priority";
import {NgForm} from "@angular/forms";
import {ListItem} from "../shared/models/list-item.model";
import {ListItemService} from "../shared/service/list-item.service";
import {Message} from "../../shared/model/message.model";
import {AlertService} from "../shared/service/alert.service";
import {Title} from "@angular/platform-browser";


@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {

    priority = priority;
    countType = countType;
    message!: Message;

    constructor(private listItemService: ListItemService,
                private alert: AlertService,
                private title: Title) { title.setTitle('Create | NeedToBuy');
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
        this.listItemService.createCard(listItem).subscribe(() => {
            this.alert.success('Покупка добавлена в список')
            form.resetForm({ countType: 'шт',amount: '1' ,priority:'warning'})
        })
    }


}
