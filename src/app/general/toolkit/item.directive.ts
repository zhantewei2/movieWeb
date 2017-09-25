import { Directive ,HostBinding} from '@angular/core';

@Directive({
  selector: '[toolkit-item]'
})
export class ToolItemDirective {
  @HostBinding('class')class:string='toolItem ztwBtn inverse addBorder';
  constructor() { }
}
