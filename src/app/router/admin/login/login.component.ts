import { Component, OnInit ,ViewChild} from '@angular/core';
import {TotalService} from '../../../service/total.service';
import {SimpleHttp} from '../../../service/simpleHttp.service';
import {AdminService} from '../admin.service';
import {AuthService} from '../auth.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    public _ts:TotalService,
    public simpleHttp:SimpleHttp,
    public _as:AdminService,
    private router:Router,
    private route:ActivatedRoute,
    public auth:AuthService
  ) { }
  url:any={
    updateHotList:'/admin6/list/updateHot',
    homeCard:'/admin6/list/makeHome'
  };
  @ViewChild('popView')popView;
  updatingHot:boolean=false;
  ngOnInit() {
    if(this._ts.msn.login)return;
    if(this._ts.msn.pristine){
      this.simpleHttp.post(this.auth.urlCheck).then(v=>{
        if(v)this._ts.msn.login=true;
      })
    }
  }
  submit(v){
    if(v.indexOf('ztw')!==0)return;
    this._as.login(v).then(v=>{
      if(!v)return this.popView.show('server err');
      if(this._ts.msn.reUrl){
        this.router.navigate([this._ts.msn.reUrl]);
        this._ts.msn.reUrl=null;
      }else {
        this.popView.show('login success');
      }
    })
  }
  logout(){
    this._as.logout().then(v=>{
      if(v)this.popView.show('loginout');
      this._ts.msn.pristine=true;
    })
  }
  goto(v){
    if(v=='insert'){
      this.router.navigate(['../0',{model:'insert'}],{relativeTo:this.route});
    }
  }
  updateHotList(){
    this.updatingHot=true;
    this.simpleHttp.post(this.url.updateHotList).then(v=>{
      this.showStatus(v);
      this.updatingHot=false;
    })
  }
  setHomeCard(){
    this.simpleHttp.get(this.url.homeCard).then(v=>{
      this.showStatus(v);
    })
  }
  showStatus(v){
    if(!v)this.popView.show('服务器错误');
    this.popView.show('更新成功');
  }
}
