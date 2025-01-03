import { Component } from '@angular/core';
import { LoggedUserDataService } from '../../../resources/logged-user-data.service';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent {

  resources : any;

  constructor(private loggedUserData : LoggedUserDataService){
    this.resources = Object.entries(loggedUserData.loggedUserModelInstance.storedResources);
    console.log(this.resources);
  }

}
