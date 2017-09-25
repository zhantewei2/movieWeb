export const ztwLocal={
  setData:(key,value,expires?)=>{
    expires=expires||86400000;
    let obj={
      value:value,
      date:new Date().getTime(),
      expires:expires
    };
    (localStorage as any)[key]=JSON.stringify(obj);
  },
  getData:(key)=>{
    let now=new Date().getTime(),obj;
    for(let i in localStorage){
      try {
        obj = JSON.parse(localStorage[i]);
      }catch(e){
        obj=null;
      }
      if (obj&&now - obj.date > obj.expires) delete localStorage[i];
    }
    return localStorage[key]?JSON.parse(localStorage[key]):null;
  }
};
