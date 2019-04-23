import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { Observable } from 'rxjs';
import { NgIf } from '@angular/common';
import { AdminGuard } from './admin.gaurd';


@Injectable({
    providedIn: 'root'
})

export class StudentGuard implements CanActivate {

    constructor(
        public authService: AuthService,
        public router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isLoggedIn !== true) {
            window.alert("Login please!");
            this.router.navigate(['dashboard'])

        }

        return true

    }
}