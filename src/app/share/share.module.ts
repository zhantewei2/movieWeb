import { NgModule} from '@angular/core';
import {CommonModule}from '@angular/common';
import { LimitStrPipe } from './limit-str.pipe';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FirstPipe } from './first.pipe';
import { EndPipe } from './end.pipe';
import {MaterialModule} from '../module/material/material.module';
import {PopViewComponent} from '../general/pop-view.component';
import { ActiveDirective } from './active.directive';
import {BtnDirective}from '../general/bar-arr/btn.directive';
import {BarArrComponent} from '../general/bar-arr/bar-arr.component';
import {ListBoardComponent} from '../general/list-board/list-board.component';
import {ControlClickDirective} from '../general/control-click.directive';
import {MiniCardComponent} from '../general/mini-card/mini-card.component';
import {ToolkitComponent} from '../general/toolkit/toolkit.component';
import {ToolItemDirective} from '../general/toolkit/item.directive';
import { BgImgComponent } from '../general/bg-img/bg-img.component';
import {ZTWScrollModule} from '../module/scrollModule/ztw-scroll.module';
@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ZTWScrollModule
  ],
  declarations: [
    LimitStrPipe,
    ControlClickDirective,
    FirstPipe,
    EndPipe,
    PopViewComponent,
    ActiveDirective,
    BtnDirective,
    BarArrComponent,
    ListBoardComponent,
    MiniCardComponent,
    ToolkitComponent,
    ToolItemDirective,
    BgImgComponent
  ],
  exports:[CommonModule,ZTWScrollModule,BgImgComponent,ToolkitComponent,ToolItemDirective,ControlClickDirective,MiniCardComponent,BtnDirective,PopViewComponent,LimitStrPipe,FirstPipe,EndPipe,MaterialModule,FormsModule,ReactiveFormsModule,ActiveDirective,BarArrComponent,ListBoardComponent]
})
export class ShareModule { }
