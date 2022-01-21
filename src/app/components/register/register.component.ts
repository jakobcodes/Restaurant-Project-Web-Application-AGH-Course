import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  displayName: string;

  constructor(private authenticationService: AuthenticationService) {
    this.email = '';
    this.password = '';
    this.displayName = '';
   }

  ngOnInit(): void {
  }
  signUp(){
    this.authenticationService.SignUp(this.email.trim(),this.password.trim(), this.displayName.trim());
    this.email = '';
    this.password = '';
    this.displayName = '';
  }

}
