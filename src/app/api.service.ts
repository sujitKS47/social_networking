import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASEURL:string=environment.apiUrl;
  constructor(private http: HttpClient) { }

  validate(userid:any,pwd:any){
    return this.http.post<any>(`${this.BASEURL}/users/validate`,{'userid':userid,'pwd':pwd});
  }

  verify(email:string){
    console.log(email)
    return this.http.get<any>(`${this.BASEURL}/users/verify?email=${email}`);
  }

  registeruser(f:any,image:File){
    let fd=new FormData()
    for(let ele in f.value){
      fd.append(ele,(<any>f.value[ele]))
      console.log(ele,f.value[ele])
    }
    fd.append("profilepic",image)
    console.log(image)
    const headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.post<any>(this.BASEURL+"/users",fd,{
      reportProgress: true,
      responseType: 'json'});
  }

  createTweet(f:any){
    console.log(f);
    return this.http.post<any>(this.BASEURL+"/posts",f);
  }

  deleteTweet(id:any){
    return this.http.delete<any>(this.BASEURL+"/posts/"+id);
  }

  updatedTweet(id:any,f:any){
    return this.http.put<any>(this.BASEURL+"/posts/"+id,f);
  }

  getallTweets(id:any){
    return this.http.get<any>(this.BASEURL+"/posts/users/"+id);
  }

  searchUsers(f:any,userid:any){
    return this.http.get<any>(this.BASEURL+"/users/search?search="+f+"&userid="+userid)
  }

  followUser(f:any){
    return this.http.post<any>(this.BASEURL+"/users/followers",f);
  }

  unfollowUser(f:any){
    return this.http.delete<any>(this.BASEURL+"/users/followers/"+f);
  }
  
  getFollowers(id:any){
    return this.http.get<any>(this.BASEURL+"/users/followers");
  }

  getFollowings(){
    return this.http.get<any>(this.BASEURL+"/users/followings");
  }
}
