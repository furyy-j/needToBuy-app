import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/model.user';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { FbCreateResponse } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    console.log('user: ', user);
    return this.http.post(`${environment.fbDbUrl}/users.json`, user).pipe(
      map((response: FbCreateResponse) => {
        return {
          ...user,
          id: response.name,
        };
      })
    );
  }

  getUsers() {
    return this.http.get<User>(`${environment.fbDbUrl}/users.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
        }));
      })
    );
    //     .pipe(map((user: User) => {
    //
    //     return {
    //         user
    //     }
    // }))
  }
}
