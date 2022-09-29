import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
declare let $:any;
@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  @Output() update:EventEmitter<any>=new EventEmitter();

  @Input() tweets:any[]=[]
  userid:string="";
  model:any={}
  constructor(private api:ApiService,private auth:AuthService) { 
    this.userid=this.auth.getAuthLoginId();
  }

  ngOnInit(): void {    
  }

  deletetweet(id:any){
    console.log("Delete tweet with id "+id)
    this.api.deleteTweet(id).subscribe(resp=>{
      alert(resp.message);
      this.update.emit();
    })
  }

  openModal(tweet:any){
    this.model.id=tweet.id;
    this.model.content=tweet.content;
    this.model.photo=tweet.photo;
    this.model.userid=sessionStorage.getItem("id");
    $("#myModal").modal("show");
  }

  onSubmit(f:any){
    console.log(f);
    this.model.content=f.value.content;
    this.api.updatedTweet(this.model.id,this.model).subscribe(resp=>{
      alert(resp.message)
      $("#myModal").modal("hide");
      this.update.emit()
    })
  }

  hideForm(){

  }

}
