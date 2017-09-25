import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router';
import { BreakMoviesComponent } from './break-movies/break-movies.component';
import {MovieService} from './movie.service';
import {GuardService} from './guard/guard.service';
import {MovieComponent} from './movie/movie.component';
import {ConveyService} from './convey.service';
import {OneService} from './movie/one.service';

const routes:Routes=[
	{
		path:'',
		pathMatch:'full',
		loadChildren:'./home/home.module#HomeModule'
	},
  {
    path:'admin6',
    loadChildren:'./admin/admin.module#AdminModule'
  },

  {
    path:'tradition',
    loadChildren:'./tradition-page/tradition-page.module#TraditionPageModule'
  },
	{
		path:':id',
		component:BreakMoviesComponent,
    canDeactivate:[GuardService]
	},
  {
    path:':id/movie',    //  url: /movie;name=;
    component:MovieComponent,
    children:[
      {
        path:'play',
        loadChildren:'./movie/movie.module#MovieModule',
        canLoad:[OneService]
      }
    ],
    canDeactivate:[OneService]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers:[
    MovieService,
    GuardService,
    ConveyService,
    OneService
  ],
  declarations: []
})
export class RoutingModule { }
