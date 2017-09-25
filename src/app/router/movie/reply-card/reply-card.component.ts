import { Component, Input,OnInit,HostBinding } from '@angular/core';
import {fadeOut} from '../../../animations/animate';
@Component({
  selector: 'app-reply-card',
  templateUrl: './reply-card.component.html',
  styleUrls: ['./reply-card.component.css'],
  animations:[fadeOut()]
})
export class ReplyCardComponent implements OnInit {
  @Input('data')data;
  @HostBinding('@FadeOut')get fn(){return null};
  constructor() { }
  ngOnInit() {
  }

}
