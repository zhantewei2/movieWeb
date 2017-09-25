import { Component, OnInit,ElementRef,Output,EventEmitter,ViewChild} from '@angular/core';
import {Validators,FormBuilder} from '@angular/forms';
import {OneService} from '../one.service';
import {maxRow} from '../../../general/form-validator/validators';
import {slideWidthToggle} from '../../../animations/animate';
import {SimpleHttp} from '../../../service/simpleHttp.service';
import {decrypt} from './decrypt';
import {key} from 'app/key';
import {fadeOut} from '../../../animations/animate';
import {DataPersistance} from '../../../service/data-persistance.service';
@Component({
  selector: 'app-write-note',
  templateUrl: './write-note.component.html',
  styleUrls: ['./write-note.component.css'],
  animations:[slideWidthToggle(),fadeOut()]
})
export class WriteNoteComponent implements OnInit {
  @Output('leNote')leNote:any=new EventEmitter();
  @ViewChild('popView')popView;
  @ViewChild('canvas')canvas;
  submitBtn:boolean=false;
  editName:string='hidden';
  verifyPass:boolean=false;
  vfStr:string;
  other:boolean=false;
  url:any={
    vf:'/router/verify',
    note:'/router/putNote',
    reply:'/router/putReply'
  };

  openVf:boolean=false;
  group:any;
  vfThrottle:any;
  uploading:boolean=false;
  replyId:any;
  expTime:Number=20000;
  vfTimeout:any;
  timeout:boolean=false;
  constructor(
    private one:OneService,
    private simpleHttp:SimpleHttp,
    private fb:FormBuilder,
    private _el:ElementRef,
    private _dp:DataPersistance
  ) { }

  ngOnInit() {
    this.group=this.fb.group({
      'content':['',[Validators.required,maxRow(4),Validators.minLength(5)]],
      'verify':['']
    })
    this.group.valueChanges.subscribe(v=>{
      if(!v.verify)return;
      if(v.verify.toLowerCase()==this.vfStr){
        this.other=false;
        this.verifyPass=true;
      }else{
        this.other=true;
        this.verifyPass=false;
      }
    })
  }
  clean(){
    if(this.replyId){
      let node=this._el.nativeElement;
      node.parentNode.removeChild(node);
      return;
    }
    this.editName='hidden';
    this.group.reset();
    this.submitBtn=false;
    this.vfStr='';
    this.verifyPass=false;
    this.other=false;
    this.openVf=false;
    this.clearTime();
  }
  submit(){
    if(!this.verifyPass){
      this.other=true;
      this.openVf=true;
      this.getVf();
    }else{
      this.putNote();
    }
  }
  getVf(){
    this.vfStr='';
    this.vfThrottle?clearTimeout(this.vfThrottle):0;
    this.vfThrottle=setTimeout(()=>{
      this.simpleHttp.post(this.url.vf).then(v=>{
        this.clearTime();
        this.vfStr=decrypt(v.vf,key).toLowerCase();
        this.vfThrottle=null;
        this.vfTimeout=setTimeout(()=>{
          this.timeout=true;
          this.popView.show('<p>验证码超时，请重新获取</p>')
        },this.expTime);
      })
    },1000);
  }
  clearTime(){
    this.timeout=false;
    if(this.vfTimeout){
      clearTimeout(this.vfTimeout);
      this.vfTimeout=null;
    }
  }
  putNote(){
    this.clearTime();
    this.uploading=true;
    new Promise(resolve=>{
      if((sessionStorage as any).name){
         resolve((sessionStorage as any).name);
      }else{
        this.one.getIp((name)=>{
          resolve(name);
        })
      }
    }).then(name=>{
      let obj:any={
        i:this.one.db._id,
        vf:this.group.value.verify.toLowerCase(),
        d:{
          n:name,
          c:this.group.value.content
        }
      };
      if(!this.replyId){
        this.simpleHttp.post(this.url.note,obj).then(v=>{
          this.uploading=false;
          if(v){
            this.storage(obj.d);
          }else{
            this.postError();
          }
        })

      }else{
        obj.o=this.replyId;
        this.simpleHttp.post(this.url.reply,obj).then(v=>{
          this.uploading=false;
          v? this.storage(obj.d):this.postError();
        })
      }
    });
  }
  storage(data){
    data.d=new Date();
    if(!this.replyId){
      this.one.db.nc++;
      this.one.cacheNotes[1].unshift(data);
      this.leNote.emit();
    }else{
      //noinspection JSAnnotator
      let item=this.one.db.notes.find(elemt=>elemt._id==this.replyId);
      item.rl++;
      item.r.push(data);
      if(item.rl>2)item.r.shift();
    }
    this.change_RAMvn();
    this.clean();
  }
  storageName(name){
    name=name.trim();
    if(!name)return;
    (sessionStorage as any).name=name;
  }
  editNameFn(){
    if(this.replyId)return;
    this.editName=this.editName=='hidden'?'show':'hidden';
  }
  setName(e){
    let name=(sessionStorage as any).name;
    if(!name)return;
    e.target.value=name;
  }
  change_RAMvn(){
    if(!this.one.breakKey)return;
    let dd=this._dp.db.data.get(this.one.breakKey);
    if(!dd)return;
    let item=dd.find(v=>v._id==this.one.db._id);
    item.nv++;
    if(!this.replyId)item.nc++;
  }
  postError(){
    this.popView.show('<p> 验证码超时，或服务器错误</p>');
    this.group.get('verify').reset();
    this.canvas.clear();
    this.other=true;
    this.verifyPass=false;
  }
}
