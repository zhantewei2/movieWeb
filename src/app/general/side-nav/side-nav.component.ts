import { Component, OnInit } from '@angular/core';
import {slideRightToggle,fadeToggle} from '../../animations/animate';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  animations:[slideRightToggle(),fadeToggle()]
})
export class SideNavComponent implements OnInit {
  slide:string='hidden';
  constructor() { }
  open(){
    this.slide='show';
  }
  close(){
    this.slide='hidden';
  }
  toggle(){
    this.slide=this.slide=='show'?'hidden':'show';
  }
  ngOnInit() {
  }

}
