export function decrypt(str,key){
  let ring=(str.charCodeAt(4)-65).toString(2),
    len=4,
    i,
    i2,
    temp,
    str2='';
  while(len--){
    i=key.charCodeAt(3-len);
    i2=str.charCodeAt(len)-48;
    temp=ring[len+1]==='1'?i-i2:i+i2;
    str2+=String.fromCharCode(temp);
  }
  return str2;
}
