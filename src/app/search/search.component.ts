import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() update:EventEmitter<any>=new EventEmitter();

  model:any={}
  list:any[]=[]
  stweets:any[]=[]
  pcount:any=0;
  tcount:any=0;
  userid:any;
  searchtext:any="";
  constructor(private api:ApiService,private auth:AuthService) { 
    this.userid=this.auth.getAuthLoginId()
  }

  ngOnInit(): void {
  }

  searchnow(f:any){
    console.log(f.value.search)
    this.searchtext=f.value.search;
    this.loadData(f.value.search);
  }

  loadData(search:any){
  
    this.api.searchUsers(search,this.userid).subscribe(resp=>{
      console.log(resp)
      this.list=resp
      this.pcount=this.list.length;
    })    
  }

  followme(id:any){
    console.log(id)
    let data={'id':id}
    this.api.followUser(data).subscribe(resp=>{
      alert(resp.message)
      this.update.emit();
      this.loadData(this.searchtext);
    })
  }

  unfollow(id:any){
    console.log("Unfollow "+id)
    this.api.unfollowUser(id).subscribe(resp=>{
      console.log(resp);
      alert(resp.message)
      this.update.emit();
      this.loadData(this.searchtext);
    })
  }

}
