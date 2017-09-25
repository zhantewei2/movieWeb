import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectName'
})
export class SelectNamePipe implements PipeTransform {

  transform(value: any): any {
    let v= value.match(/[^\/]+?$/).toString();
    return v.slice(0,v.indexOf('.'));
  }

}
