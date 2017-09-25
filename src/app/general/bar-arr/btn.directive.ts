import { Directive,Input,ElementRef} from '@angular/core';

@Directive({
  selector: '[btn]'
})
export class BtnDirective {
  icons:any={
    'pre':'fa-angle-left',
    'pres':'fa-angle-double-left',
    'next':'fa-angle-right',
    'nexts':'fa-angle-double-right'
  };
  @Input('btn')set fn(v){
    if(!v)return;
    let d=this.icons[v];
    if(d){
      v=`<i class="fa ${d}"></i>`;
    }
    this.el.nativeElement.innerHTML=v;
  }
  constructor(private el:ElementRef){}

}
