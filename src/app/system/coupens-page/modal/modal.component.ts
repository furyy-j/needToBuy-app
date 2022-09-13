import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Card} from "../../shared/models/discount-card.model";
import {AlertService} from "../../shared/service/alert.service";
import {CardService} from "../../shared/service/card.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    @Output() onModalCancel = new EventEmitter<void>();

    constructor(private alert: AlertService,
                private cardService: CardService,
                private router: Router) {
    }

    ngOnInit(): void {


    }

    close() {
        this.onModalCancel.emit();
    }
    onSubmit(form: NgForm){
        let {name, barNum} = form.value;
        const card = new Card(name, barNum.toString());
        this.cardService.createCard(card).subscribe(() => {
            this.alert.success('Карта добавлена')
            form.resetForm({})
        })
        this.onModalCancel.emit();
    }

}
