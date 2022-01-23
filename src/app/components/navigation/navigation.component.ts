import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  status: boolean = false;
  adminViewStatus: boolean = false;
  dishManagerStatus: boolean = false;
  displayName?: string;

  constructor(private authService: AuthenticationService) {
    this.authService.authState$.subscribe(status => {
      if (status != null) {
        this.status = true;
        if (status.displayName != null) {
          this.displayName = 'Welcome ' + status.displayName
        }
        this.checkAuthorizationStatus()
      } else {
        this.adminViewStatus = false
        this.dishManagerStatus = false
        this.status = false;
        this.displayName = '';
      }
    })
    
  }

  ngOnInit(): void {

  }
  checkAuthorizationStatus() {
    if(this.authService.userData){
      this.authService.userData?.pipe(take(1)).subscribe(user => {
        if (user) {
          if (user.roles.admin) {
            this.adminViewStatus = true
            this.dishManagerStatus = true
          }
          if (user.roles.manager) this.dishManagerStatus = true
        }
      })
    }
  }
  logOut() {
    this.authService.SignOut()
  }

}
