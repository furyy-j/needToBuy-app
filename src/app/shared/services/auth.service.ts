import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {map, Observable} from 'rxjs';
import {getAuth} from "@angular/fire/auth";
import {getDatabase, ref, set} from "firebase/database";

import {User} from '../model/model.user';
import {environment} from '../../../environments/environment';


@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    isLogin():boolean{
        return !!getAuth().currentUser;
    }

    createUser(user: User, id: string): void {
        const db = getDatabase();
        set(ref(db, 'users/' + id), {
            username: user.username,
            email: user.email
        });
    }

    getUser(): Observable<User> {
        const auth = getAuth();
        const id = auth.currentUser.uid
        return this.http.get<User>(`${environment.fbDbUrl}/users/${id}.json`).pipe(map((user: User) => {
            return {
                ...user,
                id
            }
        }))
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User>(`${environment.fbDbUrl}/users.json`).pipe(
            map((response: { [key: string]: any }) => {
                return Object.keys(response).map((key) => ({
                    ...response[key],
                }));
            }),
        );
    }

}

