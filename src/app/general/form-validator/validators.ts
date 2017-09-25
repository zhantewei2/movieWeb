export function maxRow(n){
  return (control)=>{
    let value=control.value;
    if(!value)return null;
    let arr=value.match(/\n/g);
    if(!arr)return null;
    let len=arr.length;
    if(len<n)return null;
    return {'limitError':{value}};
  }
}
