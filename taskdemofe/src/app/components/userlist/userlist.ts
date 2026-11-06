import { Component, inject, OnInit, output, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Pagination } from '../pagination/pagination';
import { User, userServices } from '../../api/services/user/user.services';

@Component({
  selector: 'app-userlist',
  imports: [Pagination, DatePipe],
  templateUrl: './userlist.html',
  styleUrl: './userlist.css',
})
export class Userlist implements OnInit {
  readonly editUser = output<User>();
  readonly addUser = output<void>();

  private readonly http = inject(HttpClient);
  readonly users = signal<User[]>([]);
  readonly loading = signal(false);

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(): void {
    this.loading.set(true);
    userServices.getUsers(this.http).subscribe({
      next: (response) => {
        this.users.set(response.data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
