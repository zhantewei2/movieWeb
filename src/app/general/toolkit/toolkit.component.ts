import { Component,ViewChild,ElementRef} from '@angular/core';
import {slideWidthToggle} from '../../animations/animate';
@Component({
  selector: 'app-toolkit',
  templateUrl: './toolkit.component.html',
  styleUrls: ['./toolkit.component.css'],
  animations:[slideWidthToggle()]
})
export class ToolkitComponent{
  content:string='hidden';
  once:boolean=false;
  @ViewChild('spy')spy;
  constructor(private el:ElementRef) { }
  toggle(){
    this.content=this.content=='hidden'?'show':'hidden';
    this.once=!this.once;
  }
  outClick(){
    this.content='hidden';
    this.once=false;
  }
  ngAfterViewInit(){
    this.setRight();
  }
  setRight(){
    this.spy.nativeElement.style.right=this.el.nativeElement.offsetWidth+2+'px';
  }
}
