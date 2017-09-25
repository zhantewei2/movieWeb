import { Component ,ViewChild} from '@angular/core';
import {OneService} from '../one.service';
import {playMovie,fadeToggle,slideRightToggle,slideLeftToggle,movieLoading3} from '../../../animations/animate';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  animations:[
    playMovie(),
    slideLeftToggle(),
    slideRightToggle(),
    fadeToggle(),
    movieLoading3('0.5s ease-out','-10%')]
})
export class PlayComponent{
  constructor(
    public one:OneService
  ) {}
  @ViewChild('playList')playList;
  url:string='./assets/xiguaplayer.js';
  playing:boolean=false;
  playData:any;
  playing2:boolean=false;
  overflow:string='hidden';
  anEnd(){
    this.playing2=true;
  }
  selectMovie(i){
    this.playing=true;
    this.overflow='hidden';
    setTimeout(()=>{
      this.play(i);
    },1)
  }
  play(address){
    let iframe:any=document.querySelector('#playIframe');
    iframe.src=`assets/play.html?w=${iframe.offsetWidth}&h=${iframe.offsetHeight-2}&d=${encodeURIComponent(address)}`;
  }
  back(){
    this.playing=false;
    this.playList.listState='show';
    this.one.openLight();
  }


}
