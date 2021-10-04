import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase  from 'firebase';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  @HostBinding() class = 'app-login'
  title = 'yourflashcards';

  public readonly startedAt = new Date('01-10-2021');
  public dateBefore = 0;
  
  constructor(private authS: AuthService,private afAuth: AngularFireAuth, private router: Router, private http: HttpClient){}


  ngOnInit(): void {
    this.startTimer();
  }

  private startTimer(){
    const date1 = new Date('10/01/2021');
    const date2 = new Date();
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    this.dateBefore = diffDays;
    
  }
  

  loginViaGoogle():any {
     from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider() )).subscribe(data => {
      from( data.user.getIdToken() ).subscribe(this.checkToken,this.errorLogin)
    },this.errorLogin)

  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  checkToken = (token: string) => {
    if(!token) return;
    this.http.post(`${environment.baseUrl}/login`,{typeLogin:environment.typeLogin, idToken: token }).subscribe(this.successLogin,this.errorLogin)
  }
  
  successLogin = (loginResponse: {user,token}) => {
    this.authS.userLogged.next(loginResponse.user);
    this.authS.token.next(loginResponse.token);
    this.router.navigateByUrl('')
  }

  errorLogin = (err = '') => {
    console.log("Error en el login",err)
  }
}
