import { Component, inject, OnInit, signal } from '@angular/core';
import { Pagination } from '../pagination/pagination';
import { HttpClient } from '@angular/common/http';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface UserResponse {
  success: boolean;
  data: User[];
}

@Component({
  selector: 'app-userlist',
  imports: [Pagination],
  templateUrl: './userlist.html',
  styleUrl: './userlist.css',
})
export class Userlist implements OnInit {
  ngOnInit(): void {
    this.getUsers();
  }
  users = signal<User[]>([]);
  http = inject(HttpClient);

  getUsers() {
    return this.http.get('http://localhost:3000/api/v1/user').subscribe((res: UserResponse) => {
      console.log(res.data);
      this.users.set(res.data);
    });
  }
}
