import { Directive,Input,Output,EventEmitter,ElementRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';
@Directive({
  selector: '[controlOutClick]'
})
export class ControlClickDirective {
  @Output('onOutClick')outClick:EventEmitter<any>=new EventEmitter();
  clickSub:any;
  clickOb:Observable<any>;
  @Input('once')set fn(v){
    if(v&&!this.clickSub){
      this.clickSub=this.clickOb.subscribe(v=>{
        this.outClick.emit();
        this.disabled();
      })
    }
  };

  constructor(
    private el:ElementRef
  ) {
    this.clickOb=Observable.fromEvent(document.querySelector('body'),'click');
  }
  ngOnInit(){
    this.el.nativeElement.onclick=function(e){
      e.stopPropagation();
    };
  }
  disabled(){
    this.clickSub.unsubscribe();
    this.clickSub=null;
  }
}
