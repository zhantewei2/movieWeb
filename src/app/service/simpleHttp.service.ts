import {Injectable} from '@angular/core';
import {Http,RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/delay';
@Injectable()
export class SimpleHttp{
	constructor(private http:Http){};
	options=new RequestOptions({
		headers:new Headers({
      'Content-Type':'application/json'
		}),
		withCredentials:true
	});

  loadState:number;
	realPath(url){
		return ''+url;
		//return url;
	}
	parseObj(obj){
		let str='?';
		for (var v in obj){
			str.length>1?str+='&':0;
			str+=v+'='+obj[v];
		}
		return str;
	}
	get=(url,obj?):Promise<any>=>{
	  this.loadState=1;
		obj?url+=this.parseObj(obj):0;
		return new Promise((resolve)=>{
			this.http.get(this.realPath(url),this.options).delay(200).subscribe(data=>{
				this.resolveData(data,v=>{resolve(v)});
			})
		});
	};
	post=(url,obj?):Promise<any>=>{
	  this.loadState=1;
		return new Promise((resolve)=>{
			this.http.post(this.realPath(url),obj?obj:{},this.options).delay(200).subscribe((data:any)=>{
			  this.resolveData(data,v=>{resolve(v)});
			})
		})
	};
  resolveData=((data,fn)=>{
    this.loadState=2;
    if(!data['_body'])return fn(false);
    if(+data['_body']==1)return fn(true);
    let r:any;
    try{
      fn(JSON.parse(data['_body']));
    }catch(err){
      if(err){
        fn(false);
      };
    }
  });
}
