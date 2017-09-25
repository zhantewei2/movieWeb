import { Component,ViewChild} from '@angular/core';
import {OneService} from '../one.service';
import {SimpleHttp} from '../../../service/simpleHttp.service';
import {decrypt} from '../write-note/decrypt';
import {ztwLocal} from '../../../general/localStorage';
import {TotalService} from '../../../service/total.service';
import {DataPersistance} from '../../../service/data-persistance.service';
let key='da82';
@Component({
  selector: 'app-my-grade',
  templateUrl: './my-grade.component.html',
  styleUrls: ['./my-grade.component.css']
})
export class MyGradeComponent {
  @ViewChild('popView')popView;
  loading:boolean=false;
  url:any={
    vf:'/input/v',
    g:'/input/g'
  };
  constructor(
    public one:OneService,
    public simpleHttp:SimpleHttp,
    public _ts:TotalService,
    public _dp:DataPersistance
  ) {}
  ngOnInit(){
  }

  putGrade(e){
    this.loading=true;
    if(ztwLocal.getData(this.one.db._id))return this.throwErr('exist');
    if(this._ts.msn.vf2){
      this.postG(e,this._ts.msn.vf2);
    }else{
      this.getVf().then(v=>{
        if(!v)return;
        this._ts.msn.vf2=decrypt(v,key).toLowerCase();
        this.postG(e,this._ts.msn.vf2);
      })
    }
  }
  getVf(){
    return this.simpleHttp.post(this.url.vf).then(v=>{
      if(!v){
        this.throwErr('err');
        return false;
      }
        return v.vf;
    })
  }
  postG(grade,vf){
    this.simpleHttp.post(
      this.url.g,
      {i:this.one.db._id,g:grade,v:vf}
    ).then(v=>{
      if(!v){
        this.throwErr('err');
        return false;
      }
      this.one.db.g=v.g;
      ztwLocal.setData(this.one.db._id,1);
      this.throwSuccess();
    })
  }
  throwErr(err){
    this.loading=false;
    if(err=='exist'){
       this.popView.show('这部影片，您今天已经评过分了！')
    }else{
      this.popView.show('服务器错误！')
    }
  }
  throwSuccess(){
    this.loading=false;
    this.change_RAMg();
    this.popView.show('评分成功！')
  }
  change_RAMg(){
    if(!this.one.breakKey)return;
    let dd=this._dp.db.data.get(this.one.breakKey);
    let item=dd.find(v=>v._id==this.one.db._id);
    item.g=this.one.db.g;
  }
}
