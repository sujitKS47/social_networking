import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  @Input() flist:any[]=[];
  @Output() update:EventEmitter<any>=new EventEmitter();

  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }

  unfollow(id:any){
    console.log("Unfollow "+id)
    this.api.unfollowUser(id).subscribe(resp=>{
      console.log(resp);
      alert(resp.message)
      this.update.emit();
    })
  }

}
