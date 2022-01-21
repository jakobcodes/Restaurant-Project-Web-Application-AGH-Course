import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  status: boolean = false;
  displayName?: string;

  constructor(private authService: AuthenticationService) {
    this.authService.authState$.subscribe(status => {
      if (status != null){
        this.status = true;
        if (status.displayName != null){
          this.displayName = 'Welcome ' + status.displayName
        }else{
          this.displayName = 'null'
        }
      }else{
        this.status = false;
        this.displayName = '';
      }
      
    })
  }

  ngOnInit(): void {
    
  }

  logOut(){
    this.authService.SignOut()
  }

}
