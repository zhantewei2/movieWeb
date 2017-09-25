import { Injectable } from '@angular/core';
import {TotalService} from '../service/total.service';
import {SimpleHttp} from '../service/simpleHttp.service';
import {DataPersistance} from '../service/data-persistance.service';
import {Subject} from 'rxjs/Subject';
@Injectable()
export class MovieService {
  constructor(
  	public _ts:TotalService,
  	public simpleHttp:SimpleHttp,
  	public _dp:DataPersistance
  	) { }
  newPush:Subject<number>=new Subject();
  listSub:Subject<any>=new Subject();
  loading:boolean;
  opt:any={
  	size:12,
  	barLen:5,
    showArrSize:5
  };
  cg:string;
  condition:any={};
  listCache:any={};
  showList:any={};
  msn:any={
  	showArr:[],  // [ {index:page,data:movieArr } ]
  	barArr:[],
        //showMax
        //showMin
        //nowPage
        //maxPage
  	minPage:1,
      //animateStartIndex
      //animateModel
      //anDoneLen
    anDoneI:0,
      //anDoneArr
  };
  cleanDone(){
    this.msn.anDoneArr=undefined;
    this.msn.anDonelen=undefined;
    this.msn.anDoneI=0;
  };
  getMovieArr(nowPage,callback){
  	new Promise(r=>{
  	  this.loading=true;
	  	if(!this._ts.msn.cgNav[0]){
	  		this._ts.msn.cgNavExist.subscribe(()=>{
	  			r();
	  		})
	  	}else{r()}
  	}).then(()=>{
	  	let cg=this.cg,totalSize=this._ts.findCg(cg).count;
	  	if(totalSize<=0)return;
	  	this.msn.maxPage=Math.ceil(totalSize/this.opt.size);
	  	this.msn.nowPage=nowPage;
	  	let end=totalSize-(nowPage-1)*this.opt.size,
	  		start=end-this.opt.size;
	  	start=start<0?0:start;
	  	this.setBarArr(nowPage);
	  	let obj={s:start,e:end,c:cg};
      for (let i in this.condition){
        obj[i]=this.condition[i]
      }
	  	this.postMovieArr(cg,nowPage,end,obj,(data)=>{
	  		if(!data||!data[0])return callback(false);
	  		this.msn.animateStartIndex=data[0].index;
	  		this.pushShowArr(nowPage,data);
	  		this.loading=false;
	  		this.newPush.next(1);
	  		callback(true);
	  	})
  	})
  };
  inverseArr(arr,end){
  	let arr2=[],len=arr.length,obj,state='normal';
  	if(this.msn.animateModel=='down')state='hidden';
  	if(this.msn.animateModel=='up')state='fadeIn';
  	while(len--){
  	  obj=arr[len];
  	  obj.index=end--;
      obj.animate=state;
  		arr2.push(obj);
  	}
  	this.msn.animateModel=null;
  	return arr2;
  }
  setBarArr(nowPage){
  	let begin=nowPage-2,
  		end=nowPage+2,
  		arr=[];
  	if(begin<1){
  		end+=Math.abs(1-begin);
  		begin=1;
  	}
  	if(end>this.msn.maxPage){
  		end=this.msn.maxPage;
  	}
  	for(let i=begin;i<=end;i++){
  		arr.push(i);
  	}
  	this.msn.barArr=arr;
  }
  postMovieArr(cg,nowPage,end,obj,fn){
  	if(!this._dp.db.data)this._dp.db.data=this._dp.initColleLog(300);
  	let key=cg+'_ztw_'+nowPage;
  	let data=this._dp.db.data.get(key);
  	if(nowPage==1&&!this.listCache[cg])obj['l']=1;
  	if(!data){
	  	this.simpleHttp.get('/router/movieArr',obj).then(v=>{
	  		this._dp.db.data.set(key,v.d);
	  		if(v.l){
	  		  let listData=v.l[cg];
	  		  this.listCache[cg]=listData;
	  		  this.listSub.next({cg:cg,d:listData});
        }
	  		fn(this.inverseArr(v.d,end));
	  	})
  	}else{
  		fn(this.inverseArr(data,end));
  	}
  }
  pushShowArr(nowPage,arr){
    let msn=this.msn;
    if(!msn.showMax){
      msn.showMax=msn.showMin=nowPage;
      msn.showArr.push({index:nowPage,data:arr});
    }else if(nowPage>this.msn.showMax){
      msn.showMax=nowPage;
      msn.showArr.push({index:nowPage,data:arr});
      if(msn.showArr.length>this.opt.showArrSize){
        msn.showArr.shift();
        msn.showMin++;
      }
    }else if(nowPage<msn.showMin){
      msn.showMin=nowPage;
      msn.showArr.unshift({index:nowPage,data:arr});
      if(msn.showArr.length>this.opt.showArrSize){
        msn.showArr.pop();
        msn.showMax--;
      }
    }
  };
  clearData() {
    let msn=this.msn;
    msn.showArr = [];
    msn.barArr = [];
    msn.showMax=undefined;
    msn.showMin=undefined;
    msn.nowPage=undefined;
    msn.animateStartIndex=undefined;
  }
}
