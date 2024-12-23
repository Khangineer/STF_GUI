import { Component } from '@angular/core';
import { LoggedUserDataService } from '../../../resources/logged-user-data.service';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private loggedUserData : LoggedUserDataService, private appC : AppComponent){
    this.appC.SetLoggedUser(this.loggedUserData.loggedUser);
  }
}
