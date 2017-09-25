export class breakPage{
  //return skip,limit;
  size:number;
  total:number;
  maxPage:number;
  barSize:number;
  preBarStart:number;
  constructor(pageSize,total,barSize){
    this.size=pageSize;
    this.total=total;
    this.barSize=barSize;
    this.maxPage=Math.ceil(total/pageSize);
  }
  getPageRange(nowPage){
    if(nowPage<=0||nowPage>this.maxPage)return;
    let start:number,limit:number,end:number;
    start=this.total-nowPage*this.size;
    end=start+this.size;
    if(start<0)start=0;
    limit=end-start;
    return {start:start,limit:limit};
  }
  getBarArr(nowPage){
    //return [start,end]
    //mid will show size+2;
    if(nowPage<=0||nowPage>this.maxPage)return;
    let start:number,end:number,arr=[],endAdt=[];
    start=Math.floor(nowPage/this.barSize)*this.barSize;
    if(start==this.preBarStart)return false;
    this.preBarStart=start;
    end=start+this.barSize;
    if(end>=this.maxPage){
      end=this.maxPage;
      start=end-this.barSize;
      endAdt=['next'];
    }else{
      endAdt=['next','nexts'];
    }
    if(start<=1){
      arr=['pre'];
      start=1;
    }else{
      arr=['pres','pre'];
      start=start-1;
    }
    return this.genArr(arr,start,end).concat(endAdt);
  }
  genArr(arr,start,end){
    for(let i=start;i<=end;i++){
      arr.push(i);
    }
    return arr;
  }
  cleanPre(){
    this.preBarStart=null;
  }
}
