import { Component, OnInit } from '@angular/core';
import {ListItem} from "../../shared/models/list-item.model";
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {ListItemService} from "../../shared/service/list-item.service";

@Component({
  selector: 'app-list-item-detail',
  templateUrl: './list-item-detail.component.html',
  styleUrls: ['./list-item-detail.component.scss']
})
export class ListItemDetailComponent implements OnInit {

  listItem!: ListItem;
  isLoaded = false;
  sub1!: Subscription;

  constructor(private route: ActivatedRoute,
              private listService: ListItemService) { }

  ngOnInit(): void {
    this.route.params
        .pipe(switchMap((params:Params)=>{
              return this.listService.getById(params['id'])
            })
        ).subscribe(
            (item: ListItem)=>{
          console.log('item',this.listItem)
           this.listItem = item;
        console.log('item',this.listItem)
          console.log('item',item)
                this.isLoaded = true;
      // this.form = new FormGroup({
      //   title: new FormControl(post.title, Validators.required),
      //   text: new FormControl(post.text,Validators.required)
      // })
    })
  }

}
