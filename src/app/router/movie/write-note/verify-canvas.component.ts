import {Component,Input} from '@angular/core';
let colorArr=['red','maroon','royalblue','peru','skyblue','blue','gray','purple'];
@Component({
    selector:'verify-canvas',
    template:`<canvas id="verifyCanvas" width="100px" height="40px" ></canvas>`
})
export class VerifyCanvasComponent{
    w:number=100;
    h:number=40;
    ctx:any;
    @Input('data')set fn (value){
      if(!value)return;
      let canvas: any = document.getElementById('verifyCanvas'),
        ctx = canvas.getContext('2d'),
        dots = 5;
      this.ctx=ctx;
      this.clear();
      ctx.textBaseline = 'top';
      ctx.font = '1.5rem Verdana';
      this.draw(value, ctx);
      while (dots--) {
        this.addDot(ctx);
        this.addDot2(ctx);
        this.addImpurity(ctx);
      };
    }
    constructor(
    ){}
    clear(){
      this.ctx.clearRect(0,0,this.w,this.h);
    }
    draw(str,ctx){
        ctx.shadowBlur=10;
        ctx.shadowColor='gray';
        for(let i=0,len=str.length;i<len;i++){
            let rotate=(10-Math.floor(Math.random()*20))/10*Math.PI/15;
            ctx.fillStyle=this.rdmColor();
            ctx.rotate(rotate);
            ctx.fillText(str[i],(this.w/5)*i+this.w/10,Math.round(Math.random()*(this.h/5)));
            ctx.rotate(-rotate);
        }
    }
    rdmColor(){
        return colorArr[Math.floor(Math.random()*colorArr.length)];
    }
    addImpurity(ctx){
        let halfX=this.w/2,
            halfY=this.h/2,
            beginX=Math.random()*this.w/4,
            beginY=Math.random()*this.h,
            endX=halfX+Math.random()*halfX,
            temp=beginY+halfY,
            endY=temp>this.h?Math.random()*halfY:temp;
        ctx.beginPath();
        ctx.moveTo(beginX,beginY);
        ctx.lineTo(endX,endY);
        ctx.stroke();

    }
    addDot(ctx){
        ctx.strokeStyle=this.rdmColor();
        ctx.beginPath();
        ctx.arc(Math.random()*this.w,Math.random()*this.h,Math.ceil(Math.random()*4),0,2*Math.PI);
        ctx.stroke();
    };
    addDot2(ctx){
        ctx.strokeStyle=this.rdmColor();
        ctx.beginPath();
        ctx.arc(Math.random()*this.w,Math.random()*this.h,Math.ceil(Math.random()*3),0,2*Math.PI);
        ctx.stroke();
    }
}
