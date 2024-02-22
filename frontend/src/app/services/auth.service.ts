import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLoggedIn$ = new Subject<User>();

  constructor(private http: HttpClient,
              protected userService: UserService) { };


  login(email: string, password: string): Observable<User> {
    return this.userService.login(email, password)
      .pipe(
        map(user => {
          let userConnected = new User(
            user._id,
            user.username,
            user.email,
            user.password,
          );

          localStorage.removeItem("user_id");
          localStorage.setItem("user_id", user._id);
          this.userLoggedIn$.next(userConnected);

          return userConnected;
        })
      );
  }

  signup(formData: any): Observable<any> {
    return this.userService.signup(formData)
      .pipe(
        map(data => {
          localStorage.removeItem("user_id");
          localStorage.setItem("user_id", data.user_id);
          return data;
        })
      );
  }

  logout() {
    localStorage.removeItem("user_id");
  }

  isUserConnected() {
    return localStorage.getItem("user_id") !== null;
  }
}
