import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'first'
})
export class FirstPipe implements PipeTransform {

  transform(value: any): any {
    if(typeof value!=='string')return;
    return value.slice(0,value.indexOf(' '));
  }

}
