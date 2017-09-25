import { Injectable } from '@angular/core';
import { SimpleHttp} from './simpleHttp.service';
import {Subject} from 'rxjs/Subject';
@Injectable()
export class TotalService {
  getHome(){
    this.simpleHttp.post('/router/home').then(v=>{
      if(!v||typeof v !='object')return;
      let obj:any;
      this.msn.total=v.total;
      for (let i in this.msn.table1){
        obj={name:this.msn.table1[i],count:v[i],index:i}
        this.msn.cgNav.push(obj);
      }
      this.msn.cgNavExist.next(1);
    })
  }
  msn:any={
    cgNav:[], //{name:namne,count:count,index:englishName}
    total:null,
    cgNavExist:new Subject(),
    table1:{
      actions:'动作',comeds:'喜剧',documentarys:'记录',fictions:'科幻',romances:'爱情',dramas:'剧情',horros:'恐怖',wars:'战争'
    },
    vf2:undefined,
    login:false,
    reUrl:undefined,
    pristine:true
  };
  homeList:any;
  homeCardTabs:any;
  homeCard:any;
  constructor(
  	public simpleHttp:SimpleHttp
    )
  {
    this.getHome();
  }

  findCg(index){
    for (let i=0,len=this.msn.cgNav.length;i<len;i++){
      if(this.msn.cgNav[i].index===index)return this.msn.cgNav[i];
    }
    return null;
  }
}
