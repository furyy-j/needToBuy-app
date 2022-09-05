import {Component, OnInit} from '@angular/core';
import {countType, priority} from "../shared/priority";
import {NgForm} from "@angular/forms";
import {ListItem} from "../shared/models/list-item.model";
import {ListItemService} from "../shared/service/list-item.service";


@Component({
    selector: 'app-add-product-page',
    templateUrl: './add-product-page.component.html',
    styleUrls: ['./add-product-page.component.scss'],
})
export class AddProductPageComponent implements OnInit {

    priority = priority;
    countType = countType;

    constructor(private listItemService: ListItemService) {
    }

    ngOnInit() {
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
        console.log(listItem)

        this.listItemService.create(listItem).subscribe(() => {
            form.reset()


        })
        // console.log(form.value)
        //const listItem = new ListItem(title, priority, amount, countType, description)
    }


}
