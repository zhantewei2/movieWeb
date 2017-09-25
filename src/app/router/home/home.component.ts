import { Component,ViewChild} from '@angular/core';
import {SimpleHttp} from '../../service/simpleHttp.service';
import {TotalService} from '../../service/total.service';
import {ConveyService} from '../convey.service';
import {Router} from '@angular/router';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('myScroll')myScroll;
  @ViewChild('listBoard')listBoard;
  baseLine:number=3.5*16;
	listData:any;
	boardScrollOver:boolean=false;
	boardTop:number;
	boardWidth:string;
	boardNode:any;
  constructor(
    public simpleHttp:SimpleHttp,
    public _ts:TotalService,
    public _cs:ConveyService,
    private router:Router
  ) { }
  arr=[1,2,3,4];
  listUrl:string='/router/list/homeList';
  cardUrl:string='/static/homeCard.json';
  ngOnInit() {
    this.getHomeCard();
    this.getHomeList();
  }
  ngAfterContentInit(){
    let listNode=this.boardNode=this.listBoard.nativeElement;
    this.boardTop=this.myScroll.getAbsoluteTop(listNode)-this.baseLine;
    this.boardWidth=listNode.getBoundingClientRect().width+'px';
    this.myScroll.subScroll();
  }
  getTop(e){
    if(e>this.boardTop){
      this.boardScrollOver=true;
      if(this.boardNode.style.width!==this.boardWidth)this.boardNode.style.width=this.boardWidth;
    }else{
      this.boardScrollOver=false;
    }
  }
  select(i){
    this._cs.dataToMovie=i;
    this.navTo(i.category,i._id);
  }
  getHomeCard(){
    if(this._ts.homeCard)return;
    this.simpleHttp.get(this.cardUrl).then(v=>{
      if(v){
        this._ts.homeCard=v;
        this._ts.homeCardTabs=Object.getOwnPropertyNames(v);
      }
    });
  }
  getHomeList(){
    if(this._ts.homeList)return this.listData=this._ts.homeList;

    return this.simpleHttp.get(this.listUrl).then(v=>{
      if(!v)return;
      this._ts.homeList=this.listData=v.home;
    });
  }

  goto(e){
    if(!e)return;
    this._cs.dataToMovie=null;
    this.navTo(e.cg,e._id);
  }
  navTo(cg,id){
    this._cs.sourcePath='/';
    this.router.navigate([`${cg}/movie`,{pos:id}]);
  }
}
