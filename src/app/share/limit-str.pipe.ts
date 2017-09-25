import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitStr'
})
export class LimitStrPipe implements PipeTransform {

  transform(str:string,n=18): any {
    let len = 0, str2 = '';
            for (var i of str) {
                len += i.codePointAt(0).toString(16).length;
                str2 += i;
                if (len > n) {
                    str2 += '...';
                    break;
                }
            }
            return str2;
  }

}
