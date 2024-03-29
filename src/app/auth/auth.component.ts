import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthRespnseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {

  constructor(private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  closeSub:Subscription

  @ViewChild(PlaceholderDirective) alertHost:PlaceholderDirective;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    let authObs: Observable<AuthRespnseData>;
    
    if (this.isLoginMode) {
      //.. Loging
      authObs = this.authService.loging(email, password)
      
    } else {
      // .. Sign Up
      authObs = this.authService.signUp(email, password)
       
    }

    // Shared Observable To  Subscribe For Both Login and Sign up 
    authObs.subscribe(
      // Success Condition 
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);

      },

      // failed condition
      (errorMessage) => {
        console.log(errorMessage);
        // Switch For Errors Was here
        this.error = errorMessage;
        this.showAlertCopmonent(errorMessage)
        this.isLoading = false;
      }
    )
    form.reset()

  }
  
  onHandleError() {
    this.error = null;
  }

  showAlertCopmonent(message:string) {
    const alertCmpFactory =  this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const alertCompRef = hostViewContainerRef.createComponent(alertCmpFactory);
    alertCompRef.instance.message = message;
    this.closeSub = alertCompRef.instance.close.subscribe(
      () => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear()
      }
    )
  }

  ngOnDestroy() {
    this.closeSub ? this.closeSub.unsubscribe() : null;
  }


}
