import { Component } from '@angular/core';
import { Userform } from '../../components/userform/userform';
import { Userlist } from '../../components/userlist/userlist';
import { Pagination } from '../../components/pagination/pagination';
import { Userstatistics } from '../../components/userstatistics/userstatistics';

@Component({
  selector: 'app-dashboard',
  imports: [Userstatistics, Userform, Userlist],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
