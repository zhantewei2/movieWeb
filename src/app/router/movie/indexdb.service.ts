import { Injectable } from '@angular/core';
import {IndexedDBZTW} from './indexDB/indexedDB';
@Injectable()
export class IndexdbService {
  movieDB:any;
  constructor() {
    let indexDB2=(window as any).indexedDB;
    let indexDB:any=new IndexedDBZTW();
    this.movieDB=indexDB.cappedDBztw({
      db:'myMovie',
      version:1,
      colle:'movie',
      keyPath:'_id'
    },{size:5000});
  }

}
