import { Injectable } from '@angular/core';
import {BreakMoviesComponent} from '../break-movies/break-movies.component';
@Injectable()
export class GuardService {

  constructor(){}
  canDeactivate(_bmc:BreakMoviesComponent){
    _bmc.wheelSub.unsubscribe();
    _bmc.myScroll.leave();
    _bmc.backCard=undefined;
    return true;
  }
}
