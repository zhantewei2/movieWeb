import { NgModule ,Injectable} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {ShareModule} from '../../share/share.module';
import {CarouselModule} from '../../module/carousel-module/carousel.module';
import { TabCardComponent } from './tab-card/tab-card.component';
import { NoticeComponent } from './notice/notice.component';
@Injectable()
  export class authHome{
    canDeactivate(_hc:HomeComponent){
      _hc.myScroll.leave();
      return true;
    }
}

let routes:any=[
  {path:'',component:HomeComponent,canDeactivate:[authHome]}
];

@NgModule({
  imports: [
    ShareModule,
    CarouselModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    TabCardComponent,
    NoticeComponent
  ],
  providers:[
    authHome
  ]
})
export class HomeModule { }
