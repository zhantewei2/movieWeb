import { Component} from '@angular/core';
import { TotalService} from './service/total.service';
import {SimpleHttp} from './service/simpleHttp.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hammerN:number=1;
  constructor(
  	public _ts:TotalService,
    public simpleHttp:SimpleHttp
  	){}
  ngOnInit(){


  }
}
