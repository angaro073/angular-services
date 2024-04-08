import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main>
      <h1>User List</h1>
      @for (user of users; track $index) {
        <p>{{user.name}}</p>
      }
      @empty {
        <p>Users not found!</p>
      }
    </main>
  `,
})
export class AppComponent implements OnInit {
  protected users: User[] = [];

  constructor(protected UserService : UserService){}

  ngOnInit(): void {
    this.UserService.getAll().subscribe({
      next: (res) => {
        this.users = res;
      },
      complete: () => {
        console.log("Users loaded!");
      },
      error: (response) => {
        console.log(`ERROR(${response.status}): ${response.error.error}`);
      }
    });
  }
}
