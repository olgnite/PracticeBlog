import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private auth: AuthService,
		private router: Router
	) {
	}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.auth.isAuthenticated()) {            // если пользователь авторизирован на сайте
			req = req.clone({
				setParams: {
					auth: this.auth.token
				}
			})
		}

		return next.handle(req)            // обработка ошибки в случае, если пользователь не авторизирован
			.pipe(
				catchError((error: HttpErrorResponse) => {
					console.log('[Interceptor Error]:', error)
					if (error.status === 401) {
						this.auth.logout()
						this.router.navigate(['./admin', 'login'], {
							queryParams: {
								authFailed: true
							}
						})
					}
					return throwError(error);
				})
			)
	}
}