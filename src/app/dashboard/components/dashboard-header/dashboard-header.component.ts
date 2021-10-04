import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  @Input() user: { name: string, email: string}
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  
  public logout(){
    this.auth.logout()

  }

}
