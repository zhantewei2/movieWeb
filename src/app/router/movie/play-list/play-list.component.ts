import { Component,Input,Output,EventEmitter } from '@angular/core';
import {slideHeightToggle} from '../../../animations/animate';
@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css'],
  animations:[slideHeightToggle()]
})
export class PlayListComponent {
  @Input('data') set fn(data){
    //data.model = 'movie'(default)
    if(!data.model) {
      this.data = data;
      this.getTitle();
    }

  };
  item:number;
  listState:string='show';
  @Output('selectItem') selectItem:any=new EventEmitter();
  data:any;
  constructor() { }
  titleArr:Array<string>;
  getTitle(){
    this.titleArr=[];
    for(let i in this.data){
      this.titleArr.push(i);
    }
  }
  select(i,j){
    this.selectItem.emit(i);
    this.listState='hidden';
    this.item=j;
  }

}
