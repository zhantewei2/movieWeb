import { Component, OnInit ,ViewChild,Input,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-http-load-bar',
  templateUrl: './http-load-bar.component.html',
  styleUrls: ['./http-load-bar.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HttpLoadBarComponent implements OnInit {
  constructor(
    private _cd:ChangeDetectorRef
  ){}
  @ViewChild('bar')bar;
  show:boolean=false;
  runBar:boolean=false;
  awaitBar:boolean=false;
  s:number;
  nowS:number=0;
  interval:any;
  @Input('state')set fn(state){
    if(state==1){
      if(this.runBar&&this.interval){
        clearInterval(this.interval);
      }
      this.show=true;
      this.startBar();
    }else if(state==2){
      this.runBar=false;
      if(this.awaitBar){
        this.startBar(false,false,500);
      }
    }
  }
  ngOnInit() {

  }
  startBar(first=true,init=true,mt=1000,vt=10){
    if(init){
      this.s=undefined;
      this.nowS=0;
    }
    this.runBar=true;
    let node=this.bar.nativeElement;
    this.s=this.s||node.parentNode.clientWidth;
    let circle=(t,s0,quickEnd=false)=>{
        let nowS2=0,vs=s0/t*vt;
        this.interval=setInterval(() => {
              this.nowS+=vs;
              nowS2+=vs;
              node.style.width = this.nowS+'px';
              if(Math.ceil(this.nowS)>=this.s){
                this.show=false;
                clearInterval(this.interval);
                this.awaitBar=false;
                this._cd.markForCheck();
                return;
              }
              if (nowS2>=s0) {
                clearInterval(this.interval);
                this.awaitBar=true;
                this._cd.markForCheck();
                return;
              }
              if(quickEnd&&!this.runBar){
                clearInterval(this.interval);
                circle(400,this.s-this.nowS);
                this.awaitBar=false;
              }
        }, vt)

     };
    let s=first?this.s*0.75:this.s*0.25;
    circle(mt,s,true);
  }

}
