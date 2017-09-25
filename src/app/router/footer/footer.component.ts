import { Component, OnInit } from '@angular/core';
import {slideWidthToggle,fadeToggle} from '../../animations/animate';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations:[slideWidthToggle(),fadeToggle()]
})
export class FooterComponent implements OnInit {
  show:string='hidden';
  once:boolean=false;
  mail:boolean=false;
  constructor() { }
  ngOnInit() {
  }
  toggle(){
    this.once=!this.once;
    this.show=this.show=='hidden'?'show':'hidden';
  }
  outClick(){
    this.once=false;
    this.show='hidden';
  }

}
