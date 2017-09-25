import { Component,ViewChild} from '@angular/core';
import { FormControl,Validators} from '@angular/forms';
import {slideWidthToggle} from '../../animations/animate';
import {SimpleHttp} from '../../service/simpleHttp.service';
import 'rxjs/add/operator/startWith';
import {ConveyService} from '../../router/convey.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl:'./search.component.html',
  styleUrls: ['./search.component.css'],
  animations:[slideWidthToggle()]
})
export class SearchComponent {
  constructor(
    public simpleHttp:SimpleHttp,
    public _cs:ConveyService,
    private router:Router,
    private route:ActivatedRoute
  ){};
  emptyArr:any=[];
  searchUrl:string='/router/list/searchMovie';
  searching:boolean=false;
  @ViewChild('popView')popView;
  @ViewChild('spy')input;
	inputCtrl:FormControl;
	ngOnInit(){
	  this.inputCtrl=new FormControl('',[Validators.required,Validators.maxLength(15)]);
  }
  outClick(){
    this.openSearch=false;
  }
	openSearch:boolean=false;

  search(){
    this.input.nativeElement.blur();
   if(!this.inputCtrl.valid)return;
   let value=this.inputCtrl.value.trim();
   if(this.emptyArr.indexOf(value)>=0)return this.throwEmpty();
    this.searching=true;
   let valueURI=encodeURIComponent(value);
   this.simpleHttp.get(this.searchUrl,{n:valueURI}).then(v=>{
     this.searching=false;
     if(!v||!v.c){
       this.emptyArr.push(value);
       if(this.emptyArr.length>50)this.emptyArr.shift();
       this.throwEmpty();
     }else{
       this.inputCtrl.reset();
       let url=location.pathname;
       this._cs.searchURI=value
       if(url=='/tradition/search'){
         this._cs.searchSub.next({d:v});
       }else {
           if(url.match('tradition')){
             this._cs.searchSub.next({d:v,m:'search'});
           }else {
             this._cs.searchData = v;
             this._cs.tdMsn = {};
           }
         this.router.navigate(['/tradition/search']);
       }
     }
   })
  }

  throwEmpty(){
    this.popView.show('没有找到，您要的影片~')
  }
}
