import { Component, OnInit,HostBinding,Input,Output,EventEmitter} from '@angular/core';
import {movieLoading,movieLoading2} from '../../animations/animate';
import {MovieService} from '../../router/movie.service';
@Component({
  selector: 'app-forward-load',
  templateUrl: './forward-load.component.html',
  styleUrls: ['./forward-load.component.css'],
  animations:[movieLoading(),movieLoading2()]
})
export class ForwardLoadComponent implements OnInit {
  @Input('model')model:string;
  @Output('forwardClick')click:EventEmitter<any>=new EventEmitter();
  state:boolean=false;
  constructor(
    public _ms:MovieService
  ) {}
  openLoad(){
    this.state=true;
  }
  closeLoad(){
    this.state=false;
  }
  @HostBinding('class')class='center';
  send(e){
    this.openLoad();
    this.click.emit(e);
  }

  ngOnInit() {

  }

}
