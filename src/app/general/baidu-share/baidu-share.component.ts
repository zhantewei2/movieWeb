import { Component,ViewChild} from '@angular/core';
import {fadeToggle2} from '../../animations/animate';
@Component({
  selector: 'app-baidu-share',
  templateUrl: './baidu-share.component.html',
  styleUrls: ['./baidu-share.component.css'],
  animations:[fadeToggle2()]
})
export class BaiduShareComponent{
  url:string;
  height:string='4rem';
  show:boolean=false;
  loaded:boolean=false;
  @ViewChild('iframe')iframe;
  ngOnInit(){
  }
  share(){
    setTimeout(()=>{
      let path=encodeURIComponent(window.location.href);
      this.iframe.nativeElement.src='/assets/bdShare.html?n='+path;
    },1)
  }
  toggle(){
    this.show=!this.show;
    if(!this.loaded){
      this.loaded=true;
      this.share();
    }
  }
}
