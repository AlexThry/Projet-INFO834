import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, Observable, Subject, throwError} from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private userLoggedIn$ = new Subject<User>();


    constructor(
        private http: HttpClient,
        protected userService: UserService
    ) {};


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
                }),
            );
    }


    getUserLoggedIn(): Observable<User | undefined> {
        try {

            let user_id = localStorage.getItem("user_id");
            if (user_id !== null) {
                // Retourne l'observable directement du service UserService
                return this.userService.getUserById(user_id);
            } else {
                // Retourne une chaîne (ou une valeur par défaut) si l'user_id n'est pas disponible
                return new Observable((observer) => {
                    observer.next(undefined);
                    observer.complete();
                });
            }
        } catch (e){
            return this.userService.getUserById("65d7074dddb4b24c2dab31f3")
        }
    }



    logout() {
        localStorage.removeItem("user_id");
    }

    isUserConnected() {
        return localStorage.getItem("user_id") !== null;
    }
}
