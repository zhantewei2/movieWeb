import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.css']
})
export class MiniCardComponent implements OnInit {
  @Input('data')data;
  constructor() { }

  ngOnInit() {
  }

}
