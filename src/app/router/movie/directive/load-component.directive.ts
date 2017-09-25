import { Directive,ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appLoadComponent]'
})
export class LoadComponentDirective {

  constructor(private _vcr:ViewContainerRef) { }

}
