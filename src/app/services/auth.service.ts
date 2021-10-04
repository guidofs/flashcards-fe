import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userLogged: ReplaySubject<any> = new ReplaySubject(1)
  public token: ReplaySubject<any> = new ReplaySubject(1)
  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  public logout(){
    this.fireAuth.signOut()
    this.router.navigateByUrl('')
  }
}
