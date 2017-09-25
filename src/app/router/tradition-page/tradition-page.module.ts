import { NgModule } from '@angular/core';
import { BreakPageComponent } from './break-page/break-page.component';
import {ShareModule} from '../../share/share.module';
import {RouterModule} from '@angular/router';
import {AuthSearchService} from './auth.service';
import {DefaultCardComponent} from '../../general/default-card/default-card.component';
let routes:any=[
  { path:':id',
    component:BreakPageComponent,
    canDeactivate:[AuthSearchService]
  }
];
@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BreakPageComponent,
    DefaultCardComponent
  ],
  providers:[AuthSearchService]
})
export class TraditionPageModule { }
