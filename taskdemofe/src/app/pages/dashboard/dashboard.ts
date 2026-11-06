import { Component, signal, viewChild } from '@angular/core';
import { User } from '../../api/services/user/user.services';
import { Userform } from '../../components/userform/userform';
import { Userlist } from '../../components/userlist/userlist';
import { Userstatistics } from '../../components/userstatistics/userstatistics';

@Component({
  selector: 'app-dashboard',
  imports: [Userstatistics, Userform, Userlist],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly formOpen = signal(false);
  readonly selectedUser = signal<User | null>(null);
  private readonly userList = viewChild(Userlist);

  openCreateForm(): void {
    this.selectedUser.set(null);
    this.formOpen.set(true);
  }

  openEditForm(user: User): void {
    this.selectedUser.set(user);
    this.formOpen.set(true);
  }

  closeForm(): void {
    this.formOpen.set(false);
    this.selectedUser.set(null);
  }

  onSaved(): void {
    this.closeForm();
    this.userList()?.fetchAllUsers();
  }
}
