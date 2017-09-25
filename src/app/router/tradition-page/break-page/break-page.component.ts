import { Component, OnInit } from '@angular/core';
import {ConveyService} from '../../convey.service';
import {ActivatedRoute,Router,NavigationStart} from '@angular/router';
import {breakPage} from '../../../general/breakPage';
import {SimpleHttp} from '../../../service/simpleHttp.service';
import {DataPersistance} from '../../../service/data-persistance.service';
import {colour,movieLoading3} from '../../../animations/animate';
import {TotalService} from '../../../service/total.service';
import {MovieService} from '../../movie.service';

export class Msn{
  nowPage?:number;
  count?:number;
  breakTool?:any;
  maxBar?:number;
  barArr?:any;
  condi?:any;
  showData?:any;
  searchName?:string;
  selectJ?:number;
}

@Component({
  selector: 'app-break-page',
  templateUrl: './break-page.component.html',
  styleUrls: ['./break-page.component.css'],
  animations:[colour(),movieLoading3('0.2s ease-out')]
})
export class BreakPageComponent implements OnInit {
  constructor(
    public _cs:ConveyService,
    private route:ActivatedRoute,
    private router:Router,
    public simpleHttp:SimpleHttp,
    public _ts:TotalService,
    public _dp:DataPersistance,
    public _ms:MovieService
  ) { }
  msn:Msn;
  id:string;
  searchSub:any;
  pageSize:number=12;
  searchUrl:string='/router/list/searchMovie';
  movieUrl:string='/router/movieArr';
  model:string;
  cgName:string;
  err:boolean=false;
  ngOnInit() {
    let eventSub=this.router.events.subscribe(v=>{
      if(v instanceof NavigationStart){
        this._cs.preUrl=v.url.match('movie')?v.url:null;
        eventSub.unsubscribe();
      }
    });
    this.msn=this._cs.tdMsn;
    this.route.params.subscribe((v:any)=>{
      let id=v.id;
      this.id=id;
      if(id=='search'){
        this.model='search';
        this.getSearchMsn(true);
      }else {
          let cgArr = this._ts.msn.cgNav[0];
          let getCg = () => {
            return this.msn.searchName = this._ts.msn.cgNav.find(i => i.index == id);
          };
          ((fn) => {
            if (cgArr) {
              fn(getCg());
            } else {
              this._ts.msn.cgNavExist.subscribe(v => {
                fn(getCg());
              })
            }
          })((result) => {
            if (!result||result.count<=0)return;
            this.model = id;
            this.cgName=result.name;
            if (this._cs.preUrl) {
              this._cs.preUrl = null;
              return;
            }
            this.msn.selectJ=null;
            this.msn.count = result.count;
            this.dealData();
          })
      }
    });
    this.searchSub=this._cs.searchSub.subscribe(data=>{
      if(data.m)this.model=data.m;
      this.setSearch();
      this.dealData(data.d);
    })
  }
  getSearchMsn(first=false){
    if(first){
      if(!this._cs.searchData){
        if(!this.msn.showData)this.err=true;
        return;
      }
      this.setSearch();
      this.dealData(this._cs.searchData);
      this._cs.searchData=null;
    }
  }
  setSearch(){
    this.msn.condi=this._cs.searchURI;
    this.msn.searchName=decodeURIComponent(this.msn.condi);
  }
  dealData(data?){
    let msn=this.msn,key;
    msn.nowPage=null;
      ((callback)=> {
        if (this.model !== 'search') {
          key = this.getKey2(1);
          msn.breakTool = new breakPage(this.pageSize, msn.count, 5);
          let range = msn.breakTool.getPageRange(1), data;
          if(!this._dp.db.data)this._dp.db.data=this._dp.initColleLog(300);
          data=this._dp.db.data.get(key);
          if (!data) {
            this.postMovieArr(range.start, range.start + range.limit,true).then((d:any) => {
              if (!d)return;
              this.pushCache2(key, d);
              callback(d);
            });
          }else{
            callback(data);
          }
        } else {
          key = this.getKey(1);
          if (!this._cs.tdCache.get(key)) this.pushCache(key, data.d);
          msn.count = data.c;
          msn.breakTool=new breakPage(this.pageSize,msn.count,5);
          callback(data.d);
        }
      })((d)=>{
        msn.barArr=msn.breakTool.getBarArr(1);
        this.msn.showData=this.inverseArr(d);
        msn.maxBar=Math.ceil(msn.count/this.pageSize);
        this.setNowPage(1);
      });
  }
  selectPage(page){
    this.msn.selectJ=null;
    let msn=this.msn;
    let range=msn.breakTool.getPageRange(page),key,cacheData;
    if(this.model!='search'){
      key=this.getKey2(page);
      cacheData=this._dp.db.data.get(key);
    }else{
      key=this.getKey(page);
      cacheData=this._cs.tdCache.get(key);
    }
    if(cacheData)return this.dealData2(cacheData,page);
    if(this.model=='search'){
      this.simpleHttp.get(this.searchUrl,{
        n:msn.condi,
        s:range.start,
        l:range.limit
      }).then((v:any)=>{
        if(!v||!v.d)return;
        this.pushCache(key,v.d);
        this.dealData2(v.d,page);
      })
    }else{
      this.postMovieArr(range.start,range.start+range.limit).then(d=>{
        if(!d)return;
        this.pushCache2(key,d);
        this.dealData2(d,page);
      })
    }
  }
  postMovieArr(start,end,first?){
    let query:any={s:start,e:end,c:this.model};
    if(first&&!this._ms.listCache[this.model])query.l=1;
    return this.simpleHttp.get(this.movieUrl,query).then((d:any)=>{
      if(!d)return null;
      if(d.l)this._ms.listCache[this.model]=d.l[this.model];
      return d.d;
    });
  }
  dealData2(data,page){
    let msn=this.msn;
    msn.showData=this.inverseArr(data);
    let arr=msn.breakTool.getBarArr(page);
    if(arr)msn.barArr=arr;
    this.setNowPage(page);
  }
  setNowPage(page){
    setTimeout(()=>{this.msn.nowPage=page},1);
  }
  pushCache(key,data){
    this._cs.tdCache.set(key,data);
  }
  pushCache2(key,data){
    this._dp.db.data.set(key,data);
  }
  getKey(page){
    return this.model+'_'+this.msn.condi+'_'+page;
  }
  getKey2(page){
    return this.model+'_ztw_'+page;
  }
  selectMovie(i,j){
    this._cs.dataToMovie=i;
    this.msn.selectJ=j;
    this.navTo(i);
  }
  inverseArr(arr){
    let arr2=[],len=arr.length;
    while(len--){
      arr2.push(arr[len]);
    }
    return arr2;
  }
  listGoto(e){
    this.msn.selectJ=null;
    this._cs.dataToMovie=null;
    this.navTo(e);
  }
  navTo(i){
    this._cs.sourcePath='/tradition/'+this.model;
    this.router.navigate([this.model,'movie',{pos:i._id}]);
  }
}
