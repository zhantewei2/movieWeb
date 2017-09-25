import { Component,Output,EventEmitter } from '@angular/core';
import { MovieService} from '../../router/movie.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/throttleTime';

import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/debounceTime';
@Component({
  selector: 'app-nav-progress',
  templateUrl: './nav-progress.component.html',
  styleUrls: ['./nav-progress.component.css']
})
export class NavProgressComponent {
  @Output('selectedPage')selectedPage:any=new EventEmitter();
  barValue:Subject<number>=new Subject();
  btnValue:Subject<number>=new Subject();
  disabled:boolean=false;
  debounce:boolean=false;
  constructor(
    public _ms:MovieService
  ) {
    let sub1=this.barValue.debounceTime(1000),
        sub2=this.btnValue.throttleTime(300);
    sub1.merge(sub2).subscribe(v=>{
      this.debounce=false;
      this._ms.loading=true;
      this.selectedPage.emit(v);
    })
  }
  ngAfterViewInit() {

  }
  getValue(e){
    if(!e.value)return;
    this.debounce=true;
    this.barValue.next(e.value);
  }
  selectPage(page){
    this.btnValue.next(page);
  }

}
