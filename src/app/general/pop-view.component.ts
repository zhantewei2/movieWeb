import {Component,Input } from '@angular/core';
import {trigger,transition,style,animate,state} from '@angular/animations';

let popt='0.3s ease-out';
@Component({
    selector:'pop-view',
    template:`
        <div (click)="close()" class="center popMain" [@fadeToggle]="hidePop">                    
          <div (click)="popClick($event)" [@pop]="hidePop" class="pop">
            <div class="head">
                <span><i [class]="this.showIcon"> </i></span>
                <span class="close" (click)="close()"><i class="fa fa-window-close"></i> </span>
            </div>
            <div class="body">
              <div [innerHTML]="showMsn"></div>
              <ng-content></ng-content>
            </div>
          </div>
        </div>
    `,
    styles:[
        '.popMain{position:fixed;top:0px;left:0px;z-index:10;background:rgba(0,0,0,0.2);width:100%;height:100%}',
        '.pop{z-index:11;min-width:10rem;border-radius:5px;box-sizing:border-box;box-shadow:0 0 10px gray;background:rgba(255,255,255,0.8);padding:5px;}',
        '.head{display:flex;justify-content: space-between;padding-left:1rem;padding-right:1rem;border-bottom:1px solid gainsboro}',
        '.close{color:indianred}',
        '.close:hover{cursor:pointer;text-shadow:1px 1px 1px gray}',
        '.body{padding:1rem}','.g{color:gainsboro}','.r{color:indianred}','.b{color:lightslategray}'
    ],
    animations:[
      trigger('fadeToggle',[
        state('hidden',style({display:'none'})),
        state('show',style({display:'flex'})),
        transition('hidden=>show',[style({opacity:0}),animate(200)]),
        transition('show=>hidden',[animate(200,style({opacity:0}))])
      ]),
      trigger('pop',[
          state('hidden',style({opacity:0})),
          state('show',style({opacity:1})),
          transition('hidden=>show',[style({transform:'scale(0.2,0.2)'}),animate(popt)]),
          transition('show=>hidden',[animate(popt,style({transform:'translateY(-100%)',opacity:0}))])
        ])
    ]

})
export class PopViewComponent{
    hidePop:string='hidden';
    @Input('model')model:string;
    showMsn:string;
    show(str?){
      if(str)this.showMsn=str;
      this.hidePop='show';
    }
    close(){
      this.hidePop='hidden';
    }
    showIcon:string;
    modelIcon={
      'default':'fa fa-info-circle g',
      'warning':'fa fa-warning r',
      'success':'fa fa-check-square-o g',
      'info':'fa fa-question-circle b'
    };
    ngOnInit(){
      if(!this.model)this.model='default';
      this.showIcon=this.modelIcon[this.model];
    }
    popClick(e){
      e.stopPropagation();
    }
}
