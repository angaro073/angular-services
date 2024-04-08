import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiURL: string = "https://jsonplaceholder.typicode.com/users";

  constructor(protected httpClient: HttpClient, protected logger: LoggerService) {}

  getAll(): Observable<User[]> {
    this.logger.log('Loading users...');
    return this.httpClient.get<User[]>(this.apiURL);
  }
}