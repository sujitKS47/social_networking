import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:any={}
  submitted=false;
  constructor(private _router:Router,private auth:AuthService) { }

  ngOnInit(): void {
  }

  validate(f:any){
    this.submitted=true;
    if(f.valid){
      this.auth.login(f.value).subscribe((resp:HttpResponse<any>)=>{
        console.log(resp)        
        this.auth.storeLoginInfoToCache(resp.body)
        alert('Login successful')
        this._router.navigate(['dashboard']);
      },
      (error:HttpErrorResponse)=>{
        console.log(error)
        if(error.status===401){
          alert('Invalid username or password')
        }
      })
    }
  }
}
