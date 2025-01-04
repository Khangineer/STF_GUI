import { Component } from '@angular/core';
import { LoggedUserDataService } from '../../../resources/logged-user-data.service';

@Component({
  selector: 'app-crafting',
  standalone: true,
  imports: [],
  templateUrl: './crafting.component.html',
  styleUrl: './crafting.component.css'
})
export class CraftingComponent {

  resources : any;
  starships : any;
  constructor(private loggedUserData : LoggedUserDataService){
    this.resources = loggedUserData.loggedUserModelInstance.storedResources;
    this.starships = loggedUserData.loggedUserModelInstance.ownedSpacecrafts;
  }


  
}
