import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {slideHeightToggle}from '../../animations/animate';

@Component({
  selector: 'app-list-board',
  templateUrl: './list-board.component.html',
  styleUrls: ['./list-board.component.css'],
  animations:[slideHeightToggle('0.3s ease-in-out')]
})
export class ListBoardComponent implements OnInit {
  @Input('title')title;
	@Input('data')data;
	@Output('goto')goto:any=new EventEmitter();
  constructor() { }
  showList:boolean=true;
  ngOnInit() {

  }
  gotoFn(i){
    let obj:any={_id:i._id};
    if(i.cg)obj.cg=i.cg;
    this.goto.emit(obj);
  }
}
