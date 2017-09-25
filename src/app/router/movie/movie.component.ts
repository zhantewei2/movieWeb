import { Component,ViewChild} from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import {IndexdbService} from './indexdb.service';
import {ConveyService} from '../convey.service';
import {SimpleHttp} from '../../service/simpleHttp.service';
import {OneService} from './one.service';
import {MovieService} from '../movie.service';
import {TotalService} from '../../service/total.service';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers:[IndexdbService]
})
export class MovieComponent{
  constructor(
    private db:IndexdbService,
    public _cs:ConveyService,
    private route:ActivatedRoute,
    public simpleHttp:SimpleHttp,
    private router:Router,
    public one:OneService,
    public _ms:MovieService,
    public _ts:TotalService
  ) { }
  _id:number;
  //category:string;
  msn:any={
    movieUrl:'/router/movie',
    notesSize:10, //no use
    showItd:false
  };
  @ViewChild('myScroll')myScroll;
  indexData:any;
  showData:any;
  model:any;
  listData:any;
  recommandStart:boolean;
  /*
        __v:0
         actors:..
     add to indexdb del data.scrollTop;

   */
  ngOnInit() {
    window.scrollTo(0,0);
    this.checkParentAnimate();
   this.db.movieDB.then(model=>{
      this.model=model;
      this.route.params.subscribe((data:any)=>{
        //reset
        this.one.reset();
        this.one.openLight();
        //
        this._id=+data.pos;
        model.find(this._id).then(result=>{
          this.indexData=result;
            if (!this._cs.dataToMovie) {
               this.indexData?this.postTotal('update'):this.postTotal('insert');
            } else {
              if (!result)return this.postPart('insert');
               this.checkVersion();
            }
        })
      })
   })
  }
  nextStep(){
    this.one.DBmodel=this.model;
    this.one.db=this.showData;
    this.listData=[
      this.method.listItem('片名',this.showData.name,'fa fa-film'),
      this.method.listItem('语言',this.showData.lag,'fa fa-language'),
      this.method.listItem('地区',this.showData.region,'fa fa-location-arrow'),
      this.method.listItem('年份',this.showData.year,'fa fa-calendar-o')
    ];
    setTimeout(()=>{
      this.myScroll.scrollTo('ztw_top',false,360);
    },1);
    this.method.gotoPlay();
  }
  method:any={
    listItem:(title,name,classify)=>{
      return {
        title:title,
        name:name,
        classify:classify
      }
    },
    gotoPlay:()=>{
      //内部跳转依旧使用sourcePath;
      this.one.outEntry=false;
      let path=this._cs.sourcePath,url=this.indexData.category;
      if(path){
        url=path;
        if(!path.match('movie')){
          this.one.entryPath=path;
        }
        window.history.replaceState({},'',url);
      }
      this._cs.sourcePath=null;
      this.recommandStart=true;  //set app-recommand;
      this.router.navigate(['play'],{relativeTo:this.route});
    }

  };
  back(){
    if(this.one.entryPath)this.router.navigate([this.one.entryPath]);
  }
  checkVersion(){
    if(this.indexData['__v']==this._cs.dataToMovie['__v']){
      return this.checkNotes();
    }
    this.postPart('update');
  }
  postTotal(method){
    let opt:any=this.setOpt();
    opt.model=0;
    this.simpleHttp.get(this.msn.movieUrl,opt).then(data=>{
      if(!data)return;
      this.indexData=data;
      this.showMsn(method);
    })
  }
  postPart(method){
    let opt:any=this.setOpt();
    opt.model=1;
    this.simpleHttp.get(this.msn.movieUrl,opt).then(data=>{
      if(!data)return;
      this.indexData=JSON.parse(JSON.stringify(this._cs.dataToMovie));
      for (let i in data){
        this.indexData[i]=data[i];
      }
      this.showMsn(method);
    })
  }
  setOpt(){
    return {_id:this._id}
  }
  postNotes(){
    let opt:any=this.setOpt();
    opt.model=2;
    this.simpleHttp.get(this.msn.movieUrl,opt).then(data=>{
      if(!data)return;
      this.indexData.notes=data.notes;
      for (let i of ['g','nc','nv']){
        this.indexData[i]=this._cs.dataToMovie[i];
      }
      this.showMsn('update');
    })
  }
  checkNotes(){
    if(+this.indexData.nv==+this._cs.dataToMovie.nv){
      this.showMsn(null,true);
    }else{
      this.postNotes();
    }
  }
  showMsn(method,direct=false){
    if(this.indexData.animate)delete this.indexData.animate;
    if(direct){
      if(+this.indexData.g!=+this._cs.dataToMovie.g){
        this.indexData.g=this._cs.dataToMovie.g;
        this.model.update(this.indexData);
      }
      this.indexData.notes=this.one.method.inverseArr(this.indexData.notes);
      this.showData=this.indexData;
      this.nextStep();
      return;
    }
    if(method=='update'){
      this.model.update(this.indexData);
    } else if(method=='insert'){this.model.insert(this.indexData)}
    this.indexData.notes=this.one.method.inverseArr(this.indexData.notes);
    this.showData=this.indexData;
    this.nextStep();
  }
  checkParentAnimate(){
    let msn=this._ms.msn,index=msn.anDoneI,len=msn.anDoneLen;
    if(index==0||index>=len)return;
      let endData=msn.showArr[msn.showArr.length-1];
      for(let i=index-1;i<len;i++){
        if(endData.data){endData.data[i].animate='show';}
      }
    this._ms.loading=false;
  }
  edit(){
    this.router.navigate(['admin6',this._id,{model:'update'}]);
  }
}
