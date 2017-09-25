import { NgModule,Component} from '@angular/core';
import {ShareModule} from '../../share/share.module';
import { EditComponent } from './edit/edit.component';
import {RouterModule,Routes} from '@angular/router';
import {MdSelectModule} from '@angular/material';
import {SelectNamePipe} from './select-name.pipe';
import { LoginComponent } from './login/login.component';
import {AuthService} from './auth.service';
import {AdminService} from './admin.service';
import { ListEditComponent } from './list-edit/list-edit.component';
import {SearchService} from './search.service';
@Component({
  template:'<router-outlet></router-outlet>'
})export class mainComponent{};
const routes:Routes=[
  { path:'',
    component:mainComponent,
    children:[
      {
        path:'',
        pathMatch:'full',
        redirectTo:'login'
      },
      {
        path:'login',
        component:LoginComponent
      },

      {
        path:'editList',
        component:ListEditComponent,
        canActivate:[AuthService]
      },
      {
        path:':id',
        component:EditComponent,
        canActivate:[AuthService]
      }
    ]
  }
];
@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild(routes),
    MdSelectModule
  ],
  declarations: [
    EditComponent,
    SelectNamePipe,
    LoginComponent,
    mainComponent,
    ListEditComponent
  ],
  providers:[AuthService,AdminService,SearchService]
})
export class AdminModule { }
