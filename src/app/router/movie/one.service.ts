import { Injectable } from '@angular/core';
import {getVarJn} from '../../general/getVarJsonp';
import {DataPersistance}from '../../service/data-persistance.service';
declare var returnCitySN:any;
@Injectable()
export class OneService {
  outEntry:boolean=true;
  db:any;
  DBmodel:any;
  ipStr:any;
  breakKey:string;    //当内部跳转时，这个要清除。
  noteNowPage:number=1;
  replyCache:any;
  cg:string;
  darkTheme:boolean=false;
  breakMsn:any=null;      //{page, cg,scrollTop,index};
  entryPath:string;
  cacheNotes:any={};
  constructor(
    public _dp:DataPersistance
  ) {
    this.replyCache=this._dp.initCollection(10);
  }
  clear(){
    this.outEntry=true;
  }
  canLoad(){
    if(this.outEntry){
      let path=window.location.pathname.replace('\/play','');
      history.pushState({},'',path);
      history.pushState({},'',path);
      history.back();
      return;
    }
    return true;
  }
  canDeactivate(){
    this.openLight();
    return true;
  }
  getIp(fn){
    if(this.ipStr){
      fn(this.ipStr);
    }else{
      getVarJn('http://pv.sohu.com/cityjson',()=>{
        this.ipStr='来自'+returnCitySN.cname+',IP为'+returnCitySN.cip+'的网友';
        fn(this.ipStr);
      })
    }
  }
  method:any={
    inverseArr:(arr,replyOpen=false)=>{
      let arr2=[],len=arr.length,data;
      while(len--){
        data=arr[len];
        if(replyOpen)data.replyOpen=false;
        arr2.push(data);
      }
      return arr2;
    }
  };
  reset(){
    this.noteNowPage=1;
  }
  setColors(color){
    let body=document.querySelector('body');
    this.setColor('md-list',color);
    this.setColor('md-list-item',color);
    this.setColor('md-card',color);
    body.style.background=color=='white'?'black':'ghostwhite';
    body.style.color=color;
  }
  setColor(name,color){
    let nodes:any=document.getElementsByTagName(name);
    for (let i of nodes){
      i.style.color=color;
    }
  }
  openLight(toggle=false){
    if(!this.darkTheme&&toggle){
      this.setColors('white');
      this.darkTheme=true;
      return;
    }
    if(!this.darkTheme)return;
    this.setColors('black');
    this.darkTheme=false;
  }
}
