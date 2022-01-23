import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  constructor(private authService:AuthenticationService) {
    
   }

  ngOnInit(): void {
  }
  setPersistence(session: string){
    this.authService.setPersistence(session)
  }

}
