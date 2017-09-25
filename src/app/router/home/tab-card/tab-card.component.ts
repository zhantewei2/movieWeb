import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {TotalService} from '../../../service/total.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-tab-card',
  templateUrl: './tab-card.component.html',
  styleUrls: ['./tab-card.component.css']
})
export class TabCardComponent implements OnInit {
  @Input('data')data;
  @Output('select')select:any=new EventEmitter();
  title:string;
  value;
  @Input('title')set fn(value){
    this.value=value;
    if(value=='home'){
      this.title='所有';
    }else {
      this.title = this._ts.msn.table1[value];
    }
  };
  constructor(
    public _ts:TotalService,
    private router:Router
  ) { }
  ngOnInit() {

  }
  selectItem(i){
    this.select.emit(i);
  }
  navRouter(){
    if(this.value=='home')return;
    this.router.navigate([this.value],{fragment:'top'});
  }
}
