import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() info:any={};
  
  constructor(private auth:AuthService) {    
   }
  ngOnInit(): void {
    console.log("info",this.info)      
  }

  updateProfile(f:any){
    console.log(f)    
      this.auth.updateProfile(f.value).subscribe(resp=>{
        alert(resp.message)
      },
      error=>{
        console.log(error)
      })
  }

}
