import { Component, OnInit,Input } from '@angular/core';
import {colour} from '../../animations/animate';
@Component({
  selector: 'app-movie-card1',
  templateUrl: './movie-card1.component.html',
  styleUrls: ['./movie-card1.component.css'],
  animations:[colour()]
})
export class MovieCard1Component implements OnInit {
	@Input('data')data;
	@Input('store')store;
	constructor() { }
  	ngOnInit() {

  	}

}
