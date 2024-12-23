import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoggedUserDataService } from '../../resources/logged-user-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'STF_GUI';
  loggedUser : any;


  SetLoggedUser(lg : any){
    this.loggedUser = lg;
  }
}
