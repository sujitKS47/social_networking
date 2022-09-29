import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model:any={}
  filePath="../assets/upload.png"
  image:any
  submitted=false;
  complexity=false;
  exists=false;
  upload=false;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }

  saveFile(e:any){
    const ele=(e.target as HTMLInputElement)
    const file=ele.files?.item(0)
    console.log(file)
    this.image=file
    this.upload=true;
    const reader=new FileReader()
    reader.readAsDataURL(file as Blob)
    reader.onload=()=>{
      this.filePath=reader.result as string
    }
  }

  register(f:any){  
    this.submitted=true;
    if(f.valid && this.upload){
      this.checkExists(f.value.userid)
      this.complexity=this.checkcomplexity(f.value.pwd)
      console.log("Valid",f)
      this.api.registeruser(f,this.image).subscribe(resp=>{              
        alert(resp.message)      
        f.resetForm()  
        this.submitted=false;
        this.filePath="../assets/upload.png"   
      });
    }
  }

  checkExists(userid:string){
    this.api.verify(userid).subscribe(resp=>{
      console.log(resp);
      this.exists=!resp;
    })
  }

  checkcomplexity(pwd:any) {
    let regex="[a-zA-Z0-9!@#$]{5,}";
    console.log(regex.match(pwd));
    if(pwd.length<5){
      return false;
    }
    return true;
  }
}
