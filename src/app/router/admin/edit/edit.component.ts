import { Component, OnInit,ViewChild} from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {SimpleHttp}from '../../../service/simpleHttp.service';
import {TotalService} from '../../../service/total.service';
import {Subject} from 'rxjs/Subject';
export class Data{
  _id:number;
  id:number;
  name:string;
  date:any;
  lag:string;    //language
  playData:any;
  year:number;
  actors:string;
  nc:number; //notesCount
  notes:Array<any>;
  region:string;
  category:string;
  visitCount?:number;
  itd:string;
  g:number;  //grade
  gc:number; //gradeCount
  gt:number; //gradeTotal
  img:string;
  __v:number;
  nv:number; //notesVersion;
}
class data extends Data{
  constructor(opt){
    super();
    this.name=opt.name||null;
    this.date=opt.name||null;
    this.lag=opt.name||'中文';    //language
    this.playData=opt.playData||null;
    this.year=opt.name||new Date().getFullYear();
    this.actors=opt.actors||null;
    this.nc=opt.nc||0; //notesCount
    this.notes=opt.notes||[];
    this.region=opt.region||'大陆';
    this.category=opt.category||null;
    this.itd=opt.itd||null;
    this.g=opt.g||6;  //grade
    this.gc=opt.gc||1; //gradeCount
    this.gt=opt.gt||6; //gradeTotal
    this.img=opt.img||null;
    this.__v=opt.__v||0;
    this.nv=opt.nv||0; //notesVersion;
  }
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  data:any;
  id:number;
  showData:any=[];
  group:any;
  url:string='/router/movie';
  end:boolean=false;
  cgSelect:string;
  update:boolean=false;
  playData:any;
  playArr:Array<any>;
  playPristine:boolean=true;
  originData:any;
  msn:any={
    category:undefined,
    region:undefined,
    lag:undefined,
    choosable:['g','gt','gc','nc','date','id','_id','nv','__v']
  };
  popSub:Subject<any>=new Subject();
  @ViewChild('popView')popView;
  popViewInputDirty:boolean=false;
  popViewModel:string='confirm';
  popViewInput:string;
  url2:any={
    update:'/admin6/update',
    del:'/admin6/remove',
    insert:'/admin6/insert'
  };
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    public simpleHttp:SimpleHttp,
    public _ts:TotalService
  ){

  }
  ngOnInit() {
    this.route.params.subscribe((d:any)=>{
      this.id=d.id;
      if(!d.model)return;
      if(d.model=='update')this.update=true;
      this.genSelection('region',['大陆','港台','欧美','日韩','其他']);
      this.genSelection('lag',['中文','英语','日语','韩语','英语中字','日语中字','韩语中字']);
      if(!this._ts.msn.cgNavExist) {
        let sub = this._ts.msn.cgNavExist.subscribe(v => {
          this.nextStep();
          sub.unsubscribe();
        })
      }else{
        this.nextStep();
      }
    })
  }
  nextStep(){
    this.msn.category = this._ts.msn.cgNav;
    if (this.update)return this.updateFn();
    this.append();
  }
  genSelection(name,arr){
      let arr2=[];
      arr.forEach(v=>{
        arr2.push({index:v});
      });
      this.msn[name]=arr2;
  }
  genForm(v){
      let obj:any={},item:any;
      for(let i in v){
        if(i=='constructor') continue;

        item={name:i,value:v[i]||''};
        if(i=='img'){
          item.type='img';
        }else if(i=='itd'){
          item.type='textarea';
        }else if(i=='notes'){
          item.type='json';
          obj[i]=null;
        }else if(i=='category'||i=='lag'||i=='region'){
          item.type='cg';
          item.selection=this.msn[i];
          if(item.value){
            let exist=this.msn[i].find(j=>{return j.index==item.value});
            if(!exist)item.selection.push({index:item.value});
          }
        }else if(i=='playData'){
          item.type='list';
          this.playData={};
          try{this.playData=JSON.parse(JSON.stringify(v[i]))}catch(e){};
          this.playArr=[];
          for(let i in this.playData){
            this.playArr.push(i);
          }
        }else {
          if(i=='id'||i=='_id'){

          }
          item.type = 'text';
        }

        if(obj[i]===undefined){
          if(this.msn.choosable.indexOf(i)>=0){
            item.choose=true;
            if(i=='id'||i=='_id'){
              obj[i]=[{value:item.value,disabled:true}];
            }else{
              obj[i]=item.value;
            }
          }else{
            obj[i]=[item.value,[Validators.required]]
          }
        }
        this.showData.push(item);
      }
      this.group=this.fb.group(obj);
      this.end=true;
  }
  updateFn(){
    return this.simpleHttp.get(
      this.url,
      {model:0,_id:this.id
      })
      .then(v=>{
        this.originData=v;
        this.genForm(v);
      })
  }
  append(){
    let v=this.originData=new data({});
    this.genForm(v);
  }
  delAddr(j,index){
    this.playPristine=false;
    this.playData[j].splice(index,1);
  }
  addAddr(j){
    this.playPristine=false;
    this.playData[j].push('new');
  }
  delTitle(j){
    this.playPristine=false;
    this.popViewModel='confirm';
    this.popView.show('删除整个'+j+'播放表?');
    let subscribed=this.popSub.subscribe(v=>{
      if(v){
        delete this.playData[j];
        this.playArr.splice(this.playArr.indexOf(j),1);
      }
      subscribed.unsubscribe();
    });
  }
  addTitle(){
    this.playPristine=false;
    this.popViewModel='prompt';
    if(!this.popViewInputDirty){
      this.popViewInput='xigua';
      this.popViewInputDirty=true;
    }
    this.popView.show('添加一个新的播放表');
    let subscribed=this.popSub.subscribe(v=>{
      if(v){
        let value=this.popViewInput;
        try {
          value=value.trim();
        }catch(e){};
        if(value) {
          this.playArr.push(value);
          this.playData=this.playData||{};
          this.playData[value] = [];
          this.popViewInput = null;
        }
      }
      subscribed.unsubscribe();
    })
  }
  playItemChange(j,index,value){
    this.playData[j][index]=value;
  }
  //popView
  popConfirm(){
    this.popSub.next(true);
    this.popView.close();
  }
  popCancel(){
    this.popSub.next(false);
    this.popView.close();
  }
  checkPlayData(){
    for(let i in this.playData){
      if(!this.playData[i]||!this.playData[i][0]){
        delete this.playData[i];
      }
    }
  }
  filterData(){
    let control,count=0,submitData=JSON.parse(JSON.stringify(this.group.value));
    for(let i in this.originData){
      control=this.group.get(i);
      if(control.pristine)delete submitData[i];
    }
    if(Object.getOwnPropertyNames(submitData).length==0&&this.playPristine){
      this.popViewModel='confirm';
      this.popView.show('未做任何修改');
      return Promise.resolve(null);
    }else{
      if(!this.playPristine){
        submitData['playData']=this.playData;
      }
      return Promise.resolve(submitData);
    }
  }

  submitAppend(){
    this.filterData().then(v=>{
      if(!v)return;
      this.simpleHttp.post(this.url2.insert,v).then(v=>{
        if(!v)return this.throwErr();
        this.throwSuccess();
      })
    })
  }
  submitModify(){
    this.filterData().then(v=>{
      if(!v)return;
      this.simpleHttp.post(this.url2.update,{i:this.originData._id,d:v}).then(v=>{
        if(!v)return this.throwErr();
        this.throwSuccess();
      })
    });
  }
  submitDelete(){
    let d=this.originData;
    this.simpleHttp.post(this.url2.del,
      {_id:d._id,id:d.id,cg:d.category}).then(v=>{
        if(!v)return this.throwErr();
        this.throwSuccess();
    })
  }
  resetData(){
    this.showData=[];
    this.playPristine=true;
    this.genForm(this.originData);
  }
  throwErr(){
    this.popViewModel='alert';
    this.popView.show('服务器错误');
  }
  throwSuccess(){
    this.popViewModel='alert';
    this.popView.show('操作成功,请勿重复操作');
  }
  backAdmin(){
    this.router.navigate(['../login'],{relativeTo:this.route});
  }
}
