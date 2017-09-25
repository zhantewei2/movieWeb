import { NgModule } from '@angular/core';
import { Routes,RouterModule} from '@angular/router';
import { PlayComponent } from './play/play.component';
import { GradeComponent} from '../../general/grade/grade.component';
import {BaiduShareComponent} from '../../general/baidu-share/baidu-share.component';
import {ShareModule} from '../../share/share.module';
import {PlayListComponent} from './play-list/play-list.component';
import { SelectTitleComponent } from './select-title/select-title.component';
import { SelectNamePipe } from './pipe/select-name.pipe';
import { NotesComponent } from './notes/notes.component';
import { WriteNoteComponent } from './write-note/write-note.component';
import {VerifyCanvasComponent} from './write-note/verify-canvas.component';
import { LoadComponentDirective } from './directive/load-component.directive';
import { ReplyCardComponent } from './reply-card/reply-card.component';
import { MyGradeComponent } from './my-grade/my-grade.component';
let routes:Routes=[
  {
    path:'',
    component:PlayComponent,
    pathMatch:'full'
  }
];
@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PlayComponent,
    GradeComponent,
    BaiduShareComponent,
    PlayListComponent,
    SelectTitleComponent,
    SelectNamePipe,
    NotesComponent,
    WriteNoteComponent,
    VerifyCanvasComponent,
    LoadComponentDirective,
    ReplyCardComponent,
    MyGradeComponent
  ],
  entryComponents:[
    WriteNoteComponent
  ]
})
export class MovieModule { }
