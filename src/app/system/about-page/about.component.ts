import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../shared/service/alert.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-about-page',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  form: FormGroup;

  constructor(private alert: AlertService,
              private title: Title) { title.setTitle('AboutUs | NeedToBuy');}

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required])
    })
  }

  onSubmit(){
    if(this.form.invalid){
      return
    }
    this.alert.success('Вы успешно подписались')
    this.form.reset()

  }
  ngOnDestroy(){
  }

}
