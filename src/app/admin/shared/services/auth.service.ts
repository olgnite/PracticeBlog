import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FbAuthResponse, User} from "../../../shared/interfaces";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {environment} from "src/environments/environment";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public error$: Subject<string> = new Subject<string>();

	constructor(private http: HttpClient) {
	}

	public get token(): string {
		const expDate = new Date(localStorage.getItem('fb-token-exp'));
		if (new Date() > expDate) {
			this.logout()
			return null
		}
		return localStorage.getItem('fb-token');
	}

	public login(user: User): Observable<any> {
		user.returnSecureToken = true;
		return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
			.pipe
			(
				tap(this.setToken),
				catchError(this.handleError.bind(this))
			)
	}

	public logout(): void {
		this.setToken(null)
	}

	public isAuthenticated(): boolean {
		return !!this.token;
	}

	private handleError(error: HttpErrorResponse): Observable<boolean> {
		const {message} = error.error.error

		switch (message) {
			case 'INVALID_EMAIL':
				this.error$.next('Неверный email');
				break;
			case 'INVALID_PASSWORD':
				this.error$.next('Неверный пароль');
				break;
			case 'EMAIL_NOT_FOUND':
				this.error$.next('Такого email нет');
				break;
		}
		return throwError(error);
	}

	private setToken(response: FbAuthResponse | null): void {
		if (response) {
			const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
			localStorage.setItem('fb-token', response.idToken);
			localStorage.setItem('fb-token-exp', expDate.toString());
		} else {
			localStorage.clear();
		}

	}
}