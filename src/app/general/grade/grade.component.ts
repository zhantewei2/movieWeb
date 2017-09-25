import { Component ,Input,Output,EventEmitter} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/throttleTime';
import {slideRightToggle } from '../../animations/animate';
@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css'],
  animations:[slideRightToggle()]
})
export class GradeComponent {
  gradeArr:Array<any>=new Array(5);
  star0:string='fa fa-star-o ';
  star1:string='fa fa-star-half-o ';
  star2:string='fa fa-star ';
  saveGrade:number;
  selectGrade:number;
  fromMouse:Subject<any>=new Subject();
  show:string='hidden';
  @Input('inG') set fn(v){
    this.setArr(v);
    this.saveGrade=v;
  }
  @Output('outG')outG:any=new EventEmitter();
  constructor() {
    this.fromMouse.throttleTime(500).subscribe(v=>{
      this.selectGrade=v;
      this.setArr(v);
      this.show='show';
    })
  }
  setArr(v){
    this.resetArr();
    let j:number;
    for(let i=1;i<=v;i=i+2){
      j=i==1?0:(i-1)/2;
      this.gradeArr[j]=i+1<=v?{classify:this.star2,index:i+1}:{classify:this.star1,index:i+1};
    }
  };
  click(v){
    this.fromMouse.next(v);
  }
  resetArr(){
    for(let i =0;i<5;i++){
      this.gradeArr[i]={classify:this.star0,index:i*2+2};
    }
  }
  leave(){
    this.show='hidden';
    this.setArr(this.saveGrade);
  }
  submit(){
    this.outG.emit(this.selectGrade);
  }
}
