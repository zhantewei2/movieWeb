import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {TotalService} from './service/total.service';
import {SimpleHttp} from './service/simpleHttp.service';
import { SearchComponent } from './general/search/search.component';
import {RoutingModule} from './router/router.module';
import {DataPersistance} from './service/data-persistance.service';
import { MovieCard1Component } from './general/movie-card1/movie-card1.component';
import { BreakMoviesComponent } from './router/break-movies/break-movies.component';
import { NavProgressComponent } from './general/nav-progress/nav-progress.component';
import { SideNavComponent } from './general/side-nav/side-nav.component';
import { ShareModule} from './share/share.module';
import { ForwardLoadComponent } from './general/forward-load/forward-load.component';
import { HttpLoadBarComponent } from './general/http-load-bar/http-load-bar.component';
import {MovieComponent} from './router/movie/movie.component';
import 'hammerjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {FooterComponent} from './router/footer/footer.component';
import {RecommandComponent} from './router/recommand/recommand.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MovieCard1Component,
    BreakMoviesComponent,
    NavProgressComponent,
    SideNavComponent,
    ForwardLoadComponent,
    HttpLoadBarComponent,
    MovieComponent,
    FooterComponent,
    RecommandComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    HttpModule,
    ShareModule,
    BrowserAnimationsModule
  ],
  providers: [
    TotalService,
    SimpleHttp,
    DataPersistance
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
