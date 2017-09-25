import { Component, OnInit ,ViewChild} from '@angular/core';
import {TotalService} from '../../../service/total.service';
import {SimpleHttp} from '../../../service/simpleHttp.service';
import {breakPage} from '../../../general/breakPage';
import {DataPersistance} from '../../../service/data-persistance.service';
import {SearchService} from '../search.service';
@Component({
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  cache:any;
  constructor(
    public _ts:TotalService,
    public simpleHttp:SimpleHttp,
    public _dp:DataPersistance,
    public _ss:SearchService
  ) {
    this.cache=this._dp.initCollection(100);
  }
  url:any={
    movies:'/router/movieArr',
    searchMovie:'/router/list/searchMovie',
    putList:'/admin6/list/insert',
    getList:'/router/list/list'
  };
  @ViewChild('popView')popView;
  searchInput:any;
  preCg:any;
  breakMsn:any={};
  pageSize:number=10;
  barSize:number=5;
  nowPage:number;
  selectCg:string;
  selectI:any={};
  selectIndex2:number=null;
  selectI2:any={};
  showArr:any=[];
  barArr:Array<any>=[];
  maxBar:number;
  saveArr:Array<any>=[];
  searchBreak:any;
  clean1:boolean=false;
  searching:boolean=false;
  searchWarning:string;
  searchMethod:any;
  cgChange(e){
    if(this.preCg==e)return;
    this.simpleHttp.get(this.url.getList,{cg:e}).then(v=>{
      if(!v||!v[e])return;
      let recommandList=v[e].r;
      if(!recommandList)return;
      this.saveArr=recommandList;
    });
    if(this.searching)this.searchBack();
    this.preCg=e;
    this.clean1=true;
    this.cleanData();
    this.selectPage(1);
  }
  ngAfterViewInit(){

  }
  ngOnInit() {
    if(!this._ts.msn.cgNavExist){
      let sub = this._ts.msn.cgNavExist.subscribe(v=>{
        sub.unsubscribe();
        this.nextStep();
      })}else{
        this.nextStep();
      }
  }

  nextStep(){

  }
  submitList(){
    if(!this.saveArr[0])return;
    this.simpleHttp.post(this.url.putList,
      {
        cg:this.selectCg,
        b:'r',
        d:this.saveArr
      }).then(v=>{
        if(!v){
          this.popView.show('服务器错误!');
        }else{
          this.popView.show('写入成功!');
        }
    })
  }
  moveUp(){
    let now=this.selectIndex2;
    if(!now)return;
    let nextIndex=now-1;
    if(nextIndex<0)return;
    this.replaceItem(now,nextIndex);
  }
  moveDown(){
    let now=this.selectIndex2;
    if(now===null)return;
    let nextIndex=now+1;
    if(nextIndex>=this.saveArr.length)return;
    this.replaceItem(now,nextIndex);
  }
  replaceItem(nowIndex,nextIndex){
    let temp=this.saveArr[nowIndex];
    this.saveArr[nowIndex]=this.saveArr[nextIndex];
    this.saveArr[nextIndex]=temp;
    this.selectIndex2=nextIndex;
  }
  cleanData(){
    this.saveArr=[];
    this.selectI={};
    this.selectI2={};
    this.selectIndex2=null;
  }
  selectItem(i){
    this.selectI._id=i._id;
    this.selectI.name=i.name;
    this.selectI.date=i.date;
    if(this.selectCg=='home'){
      this.selectI.cg=i.category;
      this.selectI.img=i.img;
    }
  }
  search(){
    let v=this.searchInput;
    this.nowPage=0;
    this.searchMethod=this._ss.searchClass({
        url:this.url.searchMovie,
        name:v.trim(),
        cg:this.selectCg=='home'?null:this.selectCg,
        pageSize:10,
        barSize:5
    });
    this.searchGetPage(1);
  }
  searchGetPage(nowPage){
    this.searchMethod.search(nowPage).then(v=>{
      if(!v||!v.data||!v.data[0]){
        this.searchWarning='没有匹配项';
      }else{
        this.maxBar=Math.ceil(this.searchMethod.count/10);
        if(this.searchWarning)this.searchWarning=null;
        this.searching=true;
        this.showArr=v.data;
        this.barArr=v.bar;
        console.log(this.barArr);
        this.nowPage=nowPage;
      }
    })
  }
  searchBack(){
    this.searching=false;
    this.nowPage=0;
    setTimeout(()=>{this.selectPage(1)},1);
    this.searchInput=null;
  }
  searchChange(e){
    if(!e&&this.searchWarning)this.searchWarning=null;
  }
  appendId(){
    if(!this.selectI._id)return;
    let len=this.saveArr.length;
    if(len>8)this.saveArr.shift();
    if(this.saveArr.find(v=>v._id==this.selectI._id))return;
    console.log(this.selectI);
    this.saveArr.push(JSON.parse(JSON.stringify(this.selectI)));
  }
  removeId(){
    if(!this.selectI2.name)return;
    let index=this.saveArr.indexOf(this.selectI2);
    if(index<0)return;
    this.saveArr.splice(index,1);
  }
  selectPage(v){
    if(v<=0)return;
    if(this.searching){
      this.searchGetPage(v);
    }else {
      this.getMovies(this.selectCg, v).then(d => {
        if (!d) {
          this.showArr = [];
          this.barArr = [];
          return;
        }
        this.showArr = d;
        this.nowPage = v;
      });
    }
  }
  getMovies(cg,nowPage){
    let key=cg+'_ztw_'+nowPage,
      data=this.cache.get(key);
    let breakPage:any=this.getBreakMsn(cg);
    if(data){
      if(this.clean1){
        breakPage.cleanPre();
        this.clean1=false;
      }
      let barArr=breakPage.getBarArr(nowPage);
      if(barArr)this.barArr=barArr;
      return Promise.resolve(data);
    }
    if(!breakPage)return Promise.resolve(false);
    let obj=breakPage.getPageRange(nowPage);
    this.barArr=breakPage.getBarArr(nowPage);
    return this.simpleHttp.get(
      this.url.movies,
      {
        s:obj.start,
        e:obj.start+obj.limit,
        c:cg
      }
    ).then(d=>{
      if(!d)alert('server error');
      this.cache.set(key,d.d);
      return d.d;
    })
  }
  getCgCount(cg){
    if(this.selectCg=='home')return this._ts.msn.total;
    let item=this._ts.msn.cgNav.find(item=>item.index==cg);
    return item.count;
  }
  getBreakMsn(cg):any{
    let obj:any=this.breakMsn[cg];
    if(obj){
      this.maxBar=obj.maxBar;
      return obj.data;
    }
    let count=this.getCgCount(cg);
    if(!count)return false;
    obj=this.breakMsn[cg]={};
    obj.maxBar=this.maxBar=Math.ceil(count/this.pageSize);
    return obj.data=new breakPage(this.pageSize,count,this.barSize);
  }
}
