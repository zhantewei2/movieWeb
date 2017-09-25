import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'end'
})
export class EndPipe implements PipeTransform {

  transform(value: any): any {
    if(typeof value!='string')return;
    return value.slice(value.indexOf(' '));
  }

}
