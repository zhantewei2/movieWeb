import { Component,Input} from '@angular/core';
import {DataPersistance} from '../../service/data-persistance.service';
import {TotalService} from '../../service/total.service';
import {OneService} from '../movie/one.service';
import {slideHeightLight,movieLoading3} from '../../animations/animate';
import {Router} from '@angular/router';
import {ConveyService} from '../convey.service';
@Component({
  selector: 'app-recommand',
  templateUrl: './recommand.component.html',
  styleUrls: ['./recommand.component.css'],
  animations:[slideHeightLight(),movieLoading3('0.5s ease-out','-10%')]
})
export class RecommandComponent {
  size:number=5;
  hidden:boolean=false;
  showData:Array<any>;
  throttle:any;
  loading:boolean=false;
  @Input('start') set fn(value){
    if(value){
      let source=this.one.entryPath;
      if(source=='/'){
        this.loadHomeData();
      }else{
        this.loadData();
      }
    }
  }
  constructor(
    public _ts:TotalService,
    public _dp:DataPersistance,
    public one:OneService,
    private router:Router,
    private _cs:ConveyService
  ) { }
  ngOnInit(){
    this.hidden=this.one.outEntry;
  }
  random(size){
    return Math.floor(Math.random()*size);
  }
  ranArr=function(size,limit){
    let arr=[],arr2=[],
      gen=function(num){
        if(num>=size)num=0;
        if(arr[0]!==undefined){
          for( let i of arr){
            if(num==i)return gen(++num);
          }
        }
        arr.push(num);
        return num;
      };
    while(limit--){
      arr2.push(gen(this.random(size)));
    }
    return arr2;
  };
  loadData(){
    let db=this._dp.db.data;
    if(!db)return;
    let cg=this.one.db.category,
      colleArr=db.log[cg];
    if(!colleArr)return;
    let  key=cg+'_ztw_'+colleArr[this.random(colleArr.length)],
      movies=db.get(key);
    if(!movies)return;
    let limit=5,len=movies.length;
    if(limit>len)return;
    let ranArr=this.ranArr(len,limit);
    this.setShowData(ranArr,movies);
  }
  reload(){
    if(this.throttle)return;
    this.loading=true;
    this.throttle=true;
    this.loadData();
    setTimeout(()=>{
      this.throttle=null;
      this.loading=false;
      },600);
  }
  goto(i){
    if(i._id==this.one.db._id)return;
    this.one.breakKey=null;
    this._cs.sourcePath=location.pathname;
    this._cs.dataToMovie=i;
    this.router.navigate([i.category,'movie',{pos:i._id}]);

  }
  setShowData(ranArr,movies){
    let showArr=[];
    ranArr.forEach(v=>{
      let movie=JSON.parse(JSON.stringify(movies[v]));
      movie.recommandAn='hidden';
      showArr.push(movie);
    });
    this.showData=showArr;
  }
  loadHomeData(){
    let movies=this._ts.homeCard[this.one.db.category];
    let ranArr=this.ranArr(movies.length,this.size);
    this.setShowData(ranArr,movies);
  }
}
