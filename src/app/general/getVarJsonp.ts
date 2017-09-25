export function getVarJn(url,fn){
  let script=document.createElement('script');
  script.onload=()=>{
    fn();
    document.querySelector('head').removeChild(document.getElementById('ztw_varJsonp'));
  };
  script.id='ztw_varJsonp';
  script.src=url;
  document.querySelector('head').appendChild(script);
};
