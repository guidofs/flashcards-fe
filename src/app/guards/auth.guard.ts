import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private fbAuth: AngularFireAuth, private router:Router,private auth: AuthService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

     return new Observable((observer) => {
        this.fbAuth.user.subscribe(async x=>{
          if(!x){
            this.router.navigateByUrl('/login')
            observer.next(false)
          }else{
            this.auth.userLogged.next({name: x.displayName, email: x.email})
            this.auth.token.next(await x.getIdToken())
            observer.next(true)
          }

        },x=> {
            observer.next(false)
            this.router.navigateByUrl('/login')
          }
          )
      })

  }
  
}
