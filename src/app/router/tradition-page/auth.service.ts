import { Injectable } from '@angular/core';
import {BreakPageComponent} from './break-page/break-page.component';

@Injectable()
export class AuthSearchService {
  constructor() { }
  canDeactivate(breakPage:BreakPageComponent){
    breakPage.searchSub.unsubscribe();
    return true;
  }
}
