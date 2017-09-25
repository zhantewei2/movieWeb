import {Injectable} from '@angular/core';
@Injectable()
export class DataPersistance{
	db:any={};
	initCollection(size=5){
		size--;
		let colle:any={};
		let m=new Map();
		colle.num=0;
		colle.map=m;
		colle.set=(key,value)=>{
			if(m.size>size){
				m.delete(m.keys().next().value);
				colle.num--;
			}
			m.set(key,value);
			colle.num++;
		}
		colle.get=(key)=>{
			return m.get(key);
		}
		return colle;
	}
	initColleLog(size){
	  let colle=this.initCollection(size),
      colle2:any={},
	    logs:any={};
	  let getObj=(key)=>{
	    let arr=key.split('_ztw_');
	    return {cg:arr[0],page:arr[1]};
    };
	  colle2.set=(key,value)=>{
	    let msn=getObj(key);
	    if(colle.num>size){
	      let oldMsn=getObj(colle.map.keys().next().value);
	      logs[oldMsn.cg].shift();
      }
	    if(logs[msn.cg]){
	      logs[msn.cg].push(msn.page);
      }else{
	      logs[msn.cg]=[msn.page];
      }
      colle.set(key,value);
    }
    colle2.get=(key)=>colle.get(key);
	  colle2.log=logs;
	  return colle2;
  }
}
