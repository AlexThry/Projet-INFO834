import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { User } from '../models/user.model';
import {log} from "node:util";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: "root",
})
export class UserService {
    private baseUrl = "https://web-chat-app-server.azurewebsites.net/api";

    constructor(
        private http: HttpClient) {}

    getUserById(id: string) {
        let url = `${this.baseUrl}/user/id=${id}`;

        return this.http
            .get<any>(url)
            .pipe(
                map(
                    (data: any) =>
                        new User(
                            data._id,
                            data.username,
                            data.email,
                            data.password,
                        ),
                ),
            );
    }

    signup(email: string, password: string, username: string) {
        const url = `${this.baseUrl}/user/add`

        return this.http.post<any>(url, { email, password, username })
    }

    login(email: string, password: string) {
        const url = `${this.baseUrl}/user/login`

        return this.http.post<any>(url, { email, password })
            // .pipe(
            //     catchError((error: HttpErrorResponse) => {
            //         if (error.status === 401) {
            //             // Gérer le cas où l'authentification a échoué
            //             console.error('Authentification échouée :', error);
            //         } else {
            //             // Gérer d'autres erreurs HTTP
            //             console.error('Erreur lors de la connexion :', error);
            //         }
            //
            //         // Propager l'erreur pour permettre à d'autres parties de l'application de la gérer si nécessaire
            //         return throwError(error);
            //     })
            // );

    }

    logout() {
        const url = `${this.baseUrl}/user/logout/id=${localStorage.getItem('user_id')}`
        return this.http.get<any>(url).subscribe(
            data => {
                console.log(data)
            },
            error => {
                console.error('Erreur lors de la déconnexion :', error);
            })
    }

    getAllUsers() {
        const url = `${this.baseUrl}/user`;

        return this.http.get<any>(url)
            .pipe(
                map((data: any) => data.map((user: any) =>
                    new User(
                        user._id,
                        user.username,
                        user.email,
                        user.password,
                    )
                )),
                catchError((error: HttpErrorResponse) => {
                    console.error('Error fetching users:', error);
                    return throwError(error);
                })
            );
    }

    getConnectedUsers() {
        const url = `${this.baseUrl}/connected_users`;
        return this.http.get<any>(url);
    }

    updateUsername(id:string, newUsername:string){
        const url = `${this.baseUrl}/user/updateUsername/${id}`
        return this.http.post<any>(url, {"username": newUsername})
    }
    updateEmail(id:string, newEmail:string){
        const url = `${this.baseUrl}/user/updateEmail/${id}`
        return this.http.post<any>(url, {"email": newEmail})
    }
    updatePassword(id:string, newPassword:string){
        const url = `${this.baseUrl}/user/updatePassword/${id}`
        return this.http.post<any>(url, {"password": newPassword})
    }
}
