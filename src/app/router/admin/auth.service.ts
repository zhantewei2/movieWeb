import { Injectable } from '@angular/core';
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {TotalService} from '../../service/total.service';
import {AdminService} from './admin.service';
import {SimpleHttp} from '../../service/simpleHttp.service';
@Injectable()
export class AuthService implements CanActivate{
  constructor(
    public _ts:TotalService,
    private router:Router,
    public simpleHttp:SimpleHttp,
    public _as:AdminService
  ) { }
  urlCheck:string='/admin6/checkLogin';
  url='/admin6/login';
  pristine:boolean=true;

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):any{
    if(!this._ts.msn.login){
      if(this._ts.msn.pristine){
        return this.check(state.url);
      }else {
        this._ts.msn.redirectUrl=state.url;
        this.router.navigate(['/admin6/login']);
        return false;
      }
    }else{
      return true;
    }
  }
  check(url){
    return this.simpleHttp.post(this.urlCheck).then(v=>{
      this._ts.msn.pristine=false;
      if(v){
        this._ts.msn.login=true;
        return true;
      }
        this._ts.msn.reUrl=url;
        this.router.navigate([this.url]);
        return false;
    })
  }

}
