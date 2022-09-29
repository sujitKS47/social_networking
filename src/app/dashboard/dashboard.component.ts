import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('closebutton') closebutton:any;

  model:any={}
  tweets:any[]=[]
  flist:any[]=[]
  fslist:any[]=[]
  fcount:any=0
  fscount:any=0
  uname:any="";
  loginid:any;
  uinfo:any;
  image:any
  profile:any={}
  filePath="../assets/upload.png"
  constructor(private api:ApiService,private auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
    if(!this.auth.isUserLoggedIn())
      this.logout()
    this.load_tweets()
    this.load_followers()
    this.load_followings()
    this.uname=this.auth.getAuthLoginName()
    this.loginid=this.auth.getAuthLoginId();
    this.auth.profile().subscribe((resp:HttpResponse<any>)=>{
      console.log(resp)
      this.uinfo=resp;
      console.log("uinfo ",this.uinfo)
    })
  }

  saveFile(e:any){
    const ele=(e.target as HTMLInputElement)
    const file=ele.files?.item(0)
    console.log(file)
    this.image=file
    const reader=new FileReader()
    reader.readAsDataURL(file as Blob)
    reader.onload=()=>{
      this.filePath=reader.result as string
    }
  }

  updateProfile(f:any){

  }

  createTweet(f:any) { 
    if(f.value.content===undefined && this.image===undefined)
    {
      alert('Please provide atleast text or image')      
    }  
    else{ 
      let formdata=new FormData()
      formdata.append("content",f.value.content)
      formdata.append("pic",this.image)
      formdata.append("user",this.loginid)
    this.api.createTweet(formdata).subscribe(resp=>{
      console.log(resp); 
      alert(resp.message)
      this.load_tweets()
      this.closebutton.nativeElement.click(); 
      this.model.content="";    
    },
    (error:HttpErrorResponse)=>{
      console.log(error)
    });
  }
  }

  load_tweets(){  
    this.loginid=this.auth.getAuthLoginId();  
    return this.api.getallTweets(this.loginid).subscribe(resp=>{
      console.log(resp)
      this.tweets=resp            
    });
  }

  updateData(){
    this.load_tweets()
    this.load_followers()
    this.load_followings()
  }
  
  load_followers(){    
    return this.api.getFollowers(this.loginid).subscribe(resp=>{
      console.log(resp)
      this.flist=resp 
      this.fcount=this.flist.length;           
    });
  }

  load_followings(){
    return this.api.getFollowings().subscribe(resp=>{
      console.log(resp)
      this.fslist=resp        
    this.fscount=this.fslist.length;          
    });
  }

  logout(){
    this.auth.logout()
    this._router.navigate(['/'])
  }
}
