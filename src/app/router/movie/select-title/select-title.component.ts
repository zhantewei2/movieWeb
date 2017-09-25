import { Component, OnInit,Input} from '@angular/core';

@Component({
  selector: 'select-title',
  template: `
    <span [ngSwitch]="data">
      <span *ngSwitchCase="'xigua'">
          <img src="/assets/xigua.png">
          <span style="margin-left:1rem">西瓜</span>
       </span>
    </span>
  `,
  styles:[
      'img{width:1rem;height:1rem}'
  ]
})
export class SelectTitleComponent implements OnInit {
  @Input('data')data;
  constructor() { }

  ngOnInit() {

  }

}
