import { Injectable } from '@angular/core';
import {TotalService} from '../../service/total.service';
import {SimpleHttp} from '../../service/simpleHttp.service';

@Injectable()
export class AdminService {
  constructor(
    public _ts:TotalService,
    public simpleHttp:SimpleHttp
  ) {}
  url:string='/admin6/login';
  redirectUrl:string;
  urlOut:string='/admin6/logout';

  logout(){
    return this.simpleHttp.post(this.urlOut).then(v=>{
      if(v)this._ts.msn.login=false;
      return v;
    })
  }
  login(pswd){
    return this.simpleHttp.post(this.url,{p:pswd.trim()}).then(v=>{
      if(v)this._ts.msn.login=true;
      return v;
    })
  }


}
