import { Directive,Input,ElementRef } from '@angular/core';

@Directive({
  selector: '[myActive]'
})
export class ActiveDirective {
  @Input('myActive')set fn(v){
    if(v===false&&this.el.nativeElement.getAttribute('active')){
      this.el.nativeElement.removeAttribute('active')
    }else if(v===true){
      this.el.nativeElement.setAttribute('active',true);
    }
  };
  constructor(private el:ElementRef) {
  }
}
