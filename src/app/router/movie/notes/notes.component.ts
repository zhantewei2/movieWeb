import { Component, OnInit,ComponentFactoryResolver,ViewContainerRef,ViewChildren} from '@angular/core';
import {OneService} from '../one.service';
import {fadeOut} from '../../../animations/animate';
import {WriteNoteComponent} from '../write-note/write-note.component'
import {LoadComponentDirective} from '../directive/load-component.directive';
import {breakPage} from '../../../general/breakPage';
import {SimpleHttp} from '../../../service/simpleHttp.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  animations:[fadeOut()]
})
export class NotesComponent implements OnInit {
  /*
    note size:10;
    reply size:5;
   */
  /*
    one.replyCache.set(refId+'_ztw_'+nowPage);get() : data:replyItem;
   */
  @ViewChildren(LoadComponentDirective)InsertArr;
  vcr:any;
  preI:number;
  msn:any={
    replySize:5
  };
  breakPage:any;//pagesize,total,barSize;
  breakPage2:any;
  barArr:Array<number>;
  barArr2:Array<number>; // reply barArr;
  maxPage:number=Math.ceil(10/10);
  maxPage2:number;
  nowPage2:number=1;
  showArr2:Array<any>;
  loadingReply:boolean=false;
  preShowReply:any;
  url:any={
    note:'/router/notes',// {i:_id,sk:skip};
    reply:'/router/getReply' //{o:RefObjectId,sk:skip,e:end};
  };
  constructor(
    public one :OneService,
    private _cfr:ComponentFactoryResolver,
    private _vcr:ViewContainerRef,
    public simpleHttp:SimpleHttp
  ) {
  }

  ngOnInit() {
    this.one.cacheNotes={};
  }
  ngAfterViewInit(){
    this.selectPage(this.one.noteNowPage);
  }
  clearRef(){
    if(this.vcr){
      this.vcr.clear();
      this.vcr=null;
    }
  }

  loadComponent(i,id){
    this.clearRef();
    if(i==this.preI)return this.preI=null;
    this.vcr=this.InsertArr['_results'][i]._vcr;
    let componentRef=this.vcr.createComponent(this._cfr.resolveComponentFactory(WriteNoteComponent));
    this.preI=i;
    componentRef.instance.replyId=id;
  }
  selectPage(i){
    let one=this.one;
    this.breakPage=this.breakPage||new breakPage(10,one.db.nc,5);
    one.noteNowPage=i;
    let barArr=this.breakPage.getBarArr(i);
    if(barArr)this.barArr=barArr;
    let obj:any=this.breakPage.getPageRange(i),cache=one.cacheNotes[i];
    if(cache)return one.db.notes=cache;
    if(i==1)return one.cacheNotes[i]=one.db.notes;
    this.simpleHttp.post(this.url.note,{
      i:one.db._id,
      sk:obj.start,
      l:obj.limit
    }).then(data=>{
      if(!data)return;
      one.cacheNotes[i]=one.db.notes=one.method.inverseArr(data.notes,true);
    })
  }
  leNote(){
    this.selectPage(1);
  }
  selectPage2(i,item){
    this.nowPage2=i;
    let obj:any=this.breakPage2.getPageRange(i),key=item._id+'_ztw_'+i;
    obj.end=obj.start+obj.limit;
    this.barArr2=this.breakPage2.getBarArr(i);
    let cache=this.one.replyCache.get(key);
    if(cache){
      this.showArr2=cache;
      this.loadingReply=false;
      return;
    }
    if(i==1){
      obj.start=obj.end-obj.start<=3?obj.start+2:obj.start;
    }
    this.simpleHttp.post(this.url.reply,{
      o:item._id,
      sk:obj.start,
      e:obj.end
    }).then(v=>{
      if(!v)return;
      this.showArr2=this.one.method.inverseArr(v);
      this.one.replyCache.set(key,this.showArr2);
      this.loadingReply=false;
    })
  }
  moreReply(item){
      if(this.preShowReply&&this.preShowReply!=item){
        this.preShowReply.replyOpen=false;
        this.preShowReply=item;
      }
      this.showArr2=[];
      item.replyOpen=true;
      this.loadingReply=true;
      this.breakPage2 = new breakPage(this.msn.replySize, item.rl, 3);
      this.maxPage2 = Math.ceil(item.rl/this.msn.replySize );
      this.selectPage2(1,item);
  }
  hideReply(item){
    item.replyOpen=false;
    this.loadingReply=false;
  }
}
