import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private AuthService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
        boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | UrlTree  {
        return this.AuthService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
        }), 
        )



        // Differant Approch to diriect The User If he is not Authanticated
        // return this.AuthService.user.pipe(map(user => {
        //     return !!user;
        // }), tap(isAuth => {
        //     if (!isAuth) {
        //         this.router.navigate(['/auth'])
        //     }
        // }))

     }
}