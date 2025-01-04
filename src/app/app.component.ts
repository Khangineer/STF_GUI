import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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
  loggedUser : any = null;

  constructor(private router : Router){}
  SetLoggedUser(lg : any){
    this.loggedUser = lg;
  }

  NavFleet(){
    this.router.navigate(['/fleet']);
  }

  NavResources(){
    this.router.navigate(['/resources']);
  }

  NavColonies(){
    this.router.navigate(['/colonies']);
  }

  NavNavigation(){
    this.router.navigate(['/navigation']);
  }

  NavCrafting(){
    this.router.navigate(['crafting']);
  }
}
