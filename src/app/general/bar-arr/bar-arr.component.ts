import {Component,Input,Output,EventEmitter} from '@angular/core';
import {fadeToggle2} from '../../animations/animate';

@Component({
  selector: 'app-bar-arr',
  templateUrl: './bar-arr.component.html',
  styleUrls: ['./bar-arr.component.css'],
  animations:[fadeToggle2()]
})
export class BarArrComponent {
  @Input('nowPage')set fn(nowPage){
    if(!nowPage)return;
    this.selectPage=nowPage;
    setTimeout(()=>{
      if(!this.barArr)return;
      this.loading=false;
      this.barArr.forEach(v=>{
        v.active=false;
        if(v.value==nowPage)v.active=true;
        if(typeof v.value=='number')return v.disabled=false;
        if((nowPage<2&&(v.value=='pre'||v.value=='pres'))||(nowPage+1>this.maxPage&&(v.value=='next'||v.value=='nexts'))){
          v.disabled=true;
        }else{
          v.disabled=false;
        }
      })
    },1)
  };
  loading:boolean=false;
  barArr:any;
  @Input('barArr')set fn2(arr){
    if(!arr||!arr[0])return;
    let newArr=[];
    arr.forEach(v=>{
      newArr.push({value:v,disabled:false,active:false})
    });
    this.barArr=newArr;
  };
  @Input('maxPage')maxPage;
  @Input('secondary')secondary;
  @Output('select')selectIndex:any=new EventEmitter();
  changeFn:any=()=>{};
  selectPage:number;
  arr:Array<any>;
  preI:number;
  tTime:any;

  constructor() { }
  select(item){
    let i=item.value;
    if(i==this.selectPage||this.tTime)return;
    if(i=='pre'){i=this.selectPage-1}else if(i=='pres'){i=1}else if(i=='next'){i=this.selectPage+1}else if(i=='nexts'){i=this.maxPage};
    this.selectIndex.emit(i);
    this.barArr.forEach(v=>v.disabled=true);
    this.loading=true;
    this.tTime=setTimeout(()=>{clearTimeout(this.tTime);this.tTime=null},1000);
  }
  ngOnInit(){
    this.secondary=this.secondary||false;
  }

}
