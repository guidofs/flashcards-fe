import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user; 
  constructor(private authSv: AuthService) { }

  ngOnInit(): void {
    this.authSv.userLogged.subscribe(data => {
      this.user = data;
    })
  }

}
