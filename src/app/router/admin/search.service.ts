import { Injectable } from '@angular/core';
import {SimpleHttp} from '../../service/simpleHttp.service';
import {breakPage}from '../../general/breakPage';
export interface Search{
  url:string,
  name:string,
  cg?:string,
  pageSize:number,
  barSize:number
}

@Injectable()
export class SearchService {
  constructor(
    public simpleHttp:SimpleHttp
  ) { }
  //  url:string='/router/list/searchMovie';
  searchClass:any=(params:Search)=>{
    let obj:any={
      first:true,
      count:null,
      breakPage:null,
      query:params.cg?{n:params.name,cg:params.cg}:{n:params.name},
      search:(nowPage)=>{
        if(obj.first){
          return this.simpleHttp.get(params.url,obj.query).then(d=>{
            if(!d)return false;
            obj.count=d.c;
            obj.first=false;
            obj.breakPage=new breakPage(params.pageSize,obj.count,params.barSize);
            let barArr=obj.breakPage.getBarArr(1);
            return {bar:barArr,data:d.d};
          });
        }else{
          let breakOpt=obj.breakPage.getPageRange(nowPage);
          obj.query.s=breakOpt.start;
          obj.query.l=breakOpt.limit;
          return this.simpleHttp.get(params.url,obj.query).then(d=>!d?false:{bar:obj.breakPage.getBarArr(nowPage),data:d.d});
        }
      }
    };
    return obj;
  }
}
