import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private host = environment.apiUrl;

	constructor(private authService: AuthService) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (request.url===`${this.host}/users`) {
			return next.handle(request);
		}

		if (request.url===`${this.host}/users/validate`) {
			return next.handle(request);
		}

		if (request.url===`${this.host}/users/verify`) {
			return next.handle(request);
		}

		const authToken = this.authService.getAuthTokenFromCache();
		const newRequest = request.clone({setHeaders: {Authorization: `Bearer ${authToken}`}});
		return next.handle(newRequest);
	}
}
