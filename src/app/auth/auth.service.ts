import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthDataModel} from './auth-data.model';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }
  private token: string;
  private authStatusListener = new Subject<boolean>();

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthDataModel = {email: email, password: password};
    this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
      });
  }

  login(email: string, password: string) {
    const authData: AuthDataModel = {email: email, password: password};
    this.http.post<any>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.authStatusListener.next(true);
      });
  }
}
