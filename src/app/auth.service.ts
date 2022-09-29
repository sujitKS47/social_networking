import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logoutSubject = new Subject<boolean>();
	loginUsername = new Subject<string>();
	loginId = new Subject<number>();
	private host = environment.apiUrl;
	private authToken: any;

	constructor(private httpClient: HttpClient) { }

	signup(userSignup: any) {
		return this.httpClient.post<any>(`${this.host}/users`, userSignup);
	}

	login(userLogin: any): Observable<HttpResponse<any>> {
		return this.httpClient.post<any>(`${this.host}/users/validate`, userLogin, { observe: 'response' });
	}

	profile():Observable<HttpResponse<any>>{
		return this.httpClient.get<any>(`${this.host}/users/profile`);
	}

	updateProfile(f:any){
		return this.httpClient.post<any>(`${this.host}/users/profile`,f);
	}

	logout(): void {
		this.authToken = null;
		localStorage.removeItem('userid');
		localStorage.removeItem('uname');
		localStorage.removeItem('id');
		localStorage.removeItem('authToken');
		this.logoutSubject.next(true);
	}

	storeTokenInCache(authToken: string): void {
		if (authToken != null && authToken != '') {
			this.authToken = authToken;
			localStorage.setItem('authToken', authToken);
		}
	}

  storeLoginInfoToCache(info:any):void{
    console.log(info)
    this.storeTokenInCache(info.accessToken)
    localStorage.setItem('id',info.uid)
    localStorage.setItem('uname',info.uname)
    localStorage.setItem('userid',info.userid)
    this.loginUsername.next(info.uname);
    this.loginId.next(info.uid);
  }

	loadAuthTokenFromCache(): void {
		this.authToken = localStorage.getItem('authToken');
	}

	getAuthTokenFromCache(): any {
		return localStorage.getItem('authToken');
	}

  getAuthLoginId():any{
    return localStorage.getItem('id')
  }

  getAuthLoginName():any{
    return localStorage.getItem('uname')
  }

	isUserLoggedIn(): boolean {
		this.loadAuthTokenFromCache();
		if (this.authToken != null && this.authToken != '') {
			return true;
		}
		this.logout();
		return false;
	}
}
