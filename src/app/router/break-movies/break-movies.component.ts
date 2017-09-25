import { Component,ViewChild } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {ConveyService} from '../convey.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/fromEvent';
import {OneService} from '../movie/one.service';
import {Subject} from 'rxjs/Subject';
import {MovieService} from '../movie.service';
import {movieAnimation} from '../../animations/animate';

@Component({
  templateUrl: './break-movies.component.html',
  styleUrls: ['./break-movies.component.css'],
  animations:[movieAnimation()]
})
export class BreakMoviesComponent {
  scrollMsn:any={
    scrollValue:undefined,
    scrollTop:undefined,
    scrollBottom:undefined
  };
  @ViewChild('forwardLoad')forwardLoad;
  @ViewChild('myScroll')myScroll;
  @ViewChild('forwardLoad2')forwardLoad2;
	msn:any={
		cg:undefined,
    listData:null,
    overList:true
	};
	backCard:number;
	checkTopEvent:any;
	animateDone:any={
	  down:()=>{
	    if(!this._ms.msn.anDoneArr)return;
      if(this._ms.msn.anDoneI>=this._ms.msn.anDoneLen){
        this._ms.cleanDone();
        this.resetBox();
        this._ms.loading=false;
        return;
      };
      this._ms.msn.anDoneArr[this._ms.msn.anDoneI].animate='show';
      this._ms.msn.anDoneI++;
    }
  };
	wheel:any=Observable.fromEvent(document.querySelector('body'),'wheel');
	wheelSub:any;
	scrollValue:Subject<any>=new Subject();
  	constructor(
  	private route:ActivatedRoute,
  	public _ms:MovieService,
    private router:Router,
    public _cs:ConveyService,
    public one:OneService
  	){

    }
    change(e){
  	  this.scrollValue.next(e);
    }
  	ngAfterContentInit(){
      this.route.fragment.subscribe(v=>{
        if(!v)return;
        let node:any=document.getElementById(v);
        node.scrollIntoView();
      });
  		this.route.params.subscribe((v:any)=>{
  		  this.myScroll.subScroll();
        this.scrollValue.filter(v=>v!=='out').distinctUntilChanged().subscribe(v=>{
          this._ms.msn.nowPage=v;
          this._ms.setBarArr(v);
        })
  		  this.wheelSub=this.wheel.throttleTime(1000).subscribe(v=>{
          if(this._ms.loading)return;
          this.scrollMsn.scrollTop=document.documentElement.scrollTop||document.querySelector('body').scrollTop;
          this.scrollMsn.scrollBottom=this.scrollMsn.scrollTop+window.innerHeight;
          if(this.scrollMsn.scrollTop<=0&&v.deltaY<0){
            this.forwardLoad.openLoad();
            this.selectedPage(this._ms.msn.nowPage-1);
          }else if(this.scrollMsn.scrollBottom>=document.querySelector('body').scrollHeight&&v.deltaY>0){
            this.forwardLoad2.openLoad();
            this.selectedPage(this._ms.msn.nowPage+1);
          }
        });
  			//this._ms.clearData();
        this.msn.cg=this._ms.cg=v.id;
        this.getList();
        let pre=this.one.breakMsn;
  			if(pre&&pre.cg==v.id){
          let end=pre.scrollTop-20;
          if(end>0) {
            setTimeout(() => {
              window.scrollTo(0,end);
              this.myScroll.scrollTo2(pre.scrollTop,true,300,5);
              this.backCard=pre.index;
            }, 1);
          }else{
            this.backCard=pre.index;
          }
        }else{
          this._ms.clearData();
          this.selectedPage(1);
        }
        this.one.breakMsn=null;
  		});
      this._ms.newPush.subscribe(v=>{
        this.myScroll.calControls();
        this.myScroll.checkOnce(false);
      })
  	}
    selectedPage(i){
  	  let msn=this._ms.msn;
  	  if(i<msn.minPage||i>msn.maxPage||i==msn.nowPage){
  	    this._ms.loading=false;
  	    return;
      }
  	  if(this.existsItem(i)){
  	    this._ms.setBarArr(i);
  	    this.myScroll.scrollTo(i);
        msn.nowPage=i;
  	    this._ms.loading=false;
      }else if(msn.nowPage-i==1){
        this.myScroll.scrollTo('ztw_top').then(()=>{
          msn.animateModel='up';
          this.getMoive(i,true).then(()=>{
            this.forwardLoad.closeLoad();
            msn.showArr[0].data.forEach(item=>{
              item.animate='fadeOut';
            });
            setTimeout(()=>{
              this.resetBox();
            },1);
          })
        })
      }else if(msn.nowPage-i==-1){
        this.myScroll.scrollTo('ztw_bottom').then(()=>{
          msn.animateModel='down';
          this.getMoive(i).then(()=>{
            this.forwardLoad2.closeLoad();
            this._ms.loading=true;
            let arr=msn.showArr;
            msn.anDoneArr=arr[arr.length-1].data;
            msn.anDoneLen=msn.anDoneArr.length;
            this.animateDone.down();
          });
        })
      }else{

        this._ms.clearData();
        this.getMoive(i).then(()=>{
            msn.showArr.forEach(obj=>{
              obj.data.forEach(i=>{
                i.animate='fadeOut';
              })
            })
        });
      }
    }
    existsItem(index){
      for(let i of this._ms.msn.showArr){
        if(i.index==index)return true;
      }
      return false;
    };
    getMoive(i,hold=false){
      return new Promise(resolve=>{
        this._ms.getMovieArr(i,(status)=>{
          if(!status)return this._ms.loading=false;
          setTimeout(()=>{
            !hold?this.resetBox():0;
            resolve();
          },1)
        });
      })
    }
    resetBox(){
      this.myScroll.calControls();
      this.myScroll.checkOnce();
    }
    goto(data,page){
      let msn:any=this.one.breakMsn={};
      msn.scrollTop=this.myScroll.getScrollTop();
      msn.page=page;
      msn.cg=this.msn.cg;
      msn.index=data.id;
      this.one.breakKey=this.msn.cg+'_ztw_'+page;
      this._cs.dataToMovie=data;
      this.navTo(data._id);
    }
    getList(){
      this.msn.listData=this._ms.listCache[this.msn.cg];
      if(!this.msn.listData){
        this._ms.listSub.subscribe(v=>{
          if(v.cg!=this.msn.cg)return;
          this.msn.listData=v.d;
        })
      }

    }
    topEvent(v){
      let over=(top)=>{
        this.msn.overList=true;
        if(top<68&&this.msn.overList)this.msn.overList=false;
      };
      if(this.checkTopEvent)clearTimeout(this.checkTopEvent);
      this.checkTopEvent=setTimeout(()=>{over(this.myScroll.getScrollTop())},200);
      over(v);
    }
    listGoto(d){
      this._cs.dataToMovie=null;
      this.navTo(d._id);
    }
    navTo(id){
      this._cs.sourcePath=this.msn.cg;
      this.router.navigate(['movie',{pos:id}],{relativeTo:this.route});
    }
    tradition(){
      this.router.navigate(['tradition',this.msn.cg]);
    }
}
