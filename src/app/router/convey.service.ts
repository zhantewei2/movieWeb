import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DataPersistance} from '../service/data-persistance.service';
@Injectable()
export class ConveyService {
  constructor(private _dp:DataPersistance){}
  dataToMovie:any;
  sourcePath:any;
  searchData:any;
  searchURI:any;
  searchSub:Subject<any>=new Subject();
  tdMsn:any={};
  preUrl:string;
  tdCache:any=this._dp.initCollection(50);
}
