import {Component,Input,ContentChildren,forwardRef,Output,EventEmitter} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';

import {ScrollBindDirective} from './scrollBind.directive';
interface OffsetControl{
  top:number;
  bottom:number;
  value:any;
  over?:any;
}
@Component({
	selector:'ztwScroll',
  template:` <ng-content></ng-content>` ,
  providers:[
  { provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(()=>ScrollComponent),
    multi:true
  }
  ]

})
export class ScrollComponent{
  @ContentChildren(ScrollBindDirective)controls;
  @Input('baseLine') baseLine:number;
  @Input('throttleTime')throttleTime:number;
  @Output('topEvent')topEvent:EventEmitter<number>=new EventEmitter();
  @Input('justScroll')justScroll:boolean;
  scrollOb0:any=Observable.fromEvent(window,'scroll');
  scrollOb1:any;
  offsetControls:Array<OffsetControl>;
  scrollSub:any;
  constructor(){
    const order1=this.scrollOb0.throttleTime(this.throttleTime);
    const order2=this.scrollOb0.debounceTime(150);
    const order3=Observable.timer(1,100).take(2);
    this.scrollOb1=order1.merge(order2,order3);
  }
  storeMsn:any;
  scrollHeight:number;
  scrollTop:number;
  bodySize:any;
  scrollBottom:number;
  scrollBound:number;
  stop:boolean=false;
  emit:any=()=>{};
  changeEmit:any=(msn)=>{
   if(this.storeMsn!==msn){
     this.emit(msn);
     this.storeMsn=msn;
   }
 };
  subScroll(){
    this.scrollSub=this.scrollOb1.subscribe(()=>this.checkOnce());
  }
 ngAfterContentInit(){
    if(this.justScroll)return;
   this.baseLine=this.baseLine||0;
   this.throttleTime=this.throttleTime||0;
   this.calControls();

   /*
   this.scrollOb.throttleTime(1000).subscribe(v=>{
     if(this.stop)return;
     this.scrollHeight=document.querySelector('body').scrollHeight;
     if(this.scrollHeight==this.bodySize)return;
     this.bodySize =this.scrollHeight;
     this.calControls();
   });
   */
 };
  checkOnce(emit=true){
    this.scrollTop=this.getScrollTop();
    this.topEvent.emit(this.scrollTop);
    this.scrollBottom=this.scrollTop+window.innerHeight;
    if(!emit)return;
    let i=this.offsetControls.length;
    while(i--) {
      this.scrollBound = this.offsetControls[i].over === 'bottom' ? this.scrollBottom : this.scrollTop;
      if (this.scrollBound >= this.offsetControls[i].top && this.scrollBound <= this.offsetControls[i].bottom) {
        this.changeEmit(this.offsetControls[i].value);
        return;
      }
    }
    this.changeEmit('out');
  }
  getScrollTop(){
   return document.documentElement.scrollTop||document.querySelector('body').scrollTop;
  }
 calControls(){
  this.offsetControls=[];
  this.controls.map(control=>{
    let node=control.el.nativeElement,
    offsetControl:any={};
    offsetControl.top=control.over==='bottom'?this.getAbsoluteTop(node):this.getAbsoluteTop(node)-this.baseLine;
    offsetControl.bottom=offsetControl.top+node.offsetHeight;
    offsetControl.value=control.value;
    offsetControl.over=control.over;
    this.offsetControls.push(offsetControl);
  });

};
scrollTo(value,out=false,t0=300){
  this.calControls();
  this.stop=true;
  if(value=='ztw_top'){
    if(this.getScrollTop()<=0)return Promise.resolve();
    return this.scrollTo2(0,out,t0);
  }
  if(value=='ztw_bottom'){
    if(this.getScrollTop()+window.innerHeight>=document.querySelector('body').scrollHeight)return Promise.resolve();
    return this.scrollTo2(-1,out,t0);
  }
  for(let i of this.offsetControls){
    if(i.value==value){
      return this.scrollTo2(i.top,out,t0);
    };
  }
};
scrollTo2(pos:number,out=false,t0=300,vt=10){
  return new Promise(resolve=>{
    let top=this.scrollTop,
      end=document.querySelector('body').scrollHeight-window.innerHeight;
    if(!top)top=this.getScrollTop();
    if(pos==-1){
      pos=end;
    }else{
      pos>end?pos=end:0;
      pos<0?pos=0:0;
    }
    let scroll=(state,s,t,fn)=>{
    let a=2*s/(t*t), v0, s0, pt=0,Vmid=0;
    if(s==0)return resolve();
    if(state){
      v0=Math.sqrt(2*a*s);
      if(s<0)v0=0-v0;
    }
    let circle=()=>{
      setTimeout(()=>{
        if(pt>=t){return fn()};
        v0=a*pt;
        pt+=vt;
        v0=(v0+a*pt)/2;
        s0=v0*vt;
        top+=s0;
        window.scrollTo(0,top);
        circle()
      },vt)
    };
    let circle2=()=>{
      setTimeout(()=>{
        if(pt>=t){this.stop=false;return fn()};
        Vmid=v0-a*vt/2;
        s0=Vmid*vt;
        pt+=vt;
        v0=v0-a*vt;
        top+=s0;
        window.scrollTo(0,top);
        circle2()
      },vt)
    };
    state?circle2():circle();
    };
    if(out){
      scroll(true,pos-top,t0,()=>{resolve()});
    }else{
      let sHalf=(pos-top)/2,tHalf=t0/2;
      scroll(false,sHalf,tHalf,()=>{
        scroll(true,sHalf,tHalf,()=>{
          resolve()
        })
      })
    }
  })
}
getAbsoluteTop(node){
  let top=node.offsetTop;
  if(node.offsetParent) top+=this.getAbsoluteTop(node.offsetParent);
  return top;
}
leave(){
  this.scrollSub?this.scrollSub.unsubscribe():0;
}
registerOnTouched(){};
registerOnChange(fn:any){
  this.emit=fn;
};
writeValue(value){
  this.offsetControls?this.scrollTo(value):0;
};
ngOnDestroy(){
  this.leave();
}
}
