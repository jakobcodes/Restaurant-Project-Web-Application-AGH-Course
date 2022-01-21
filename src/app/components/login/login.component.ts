import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authenticationService: AuthenticationService) {
    this.email = '';
    this.password = '';
   }

  ngOnInit(): void {
  }

  signIn(){
    this.authenticationService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }

}
