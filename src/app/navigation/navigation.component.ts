import { Component } from '@angular/core';
import { LoggedUserDataService } from '../../../resources/logged-user-data.service';
import { galaxies, Galaxy } from '../../../Models/Galaxy';
import { concat } from 'lodash';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  
  galaxies : any;

  constructor(private loggedUserData : LoggedUserDataService){
    this.galaxies = galaxies;
  }


  ShowGalaxyName(galaxyName: string) {
  this.galaxies.forEach((element: Galaxy) => {
    if (element.name === galaxyName) {
      const paragraphName = galaxyName + "Name";
      const element = document.getElementById(paragraphName.toString()) as HTMLParagraphElement;
      
      if (element) {

        element.classList.remove('gone');
        element.classList.remove('shown');
        element.classList.add('fade-in');
        element.innerText = galaxyName;

        setTimeout(() => {
          element.classList.remove('fade-in');
          element.classList.add('visible'); 
        }, 10); 
      }
    }
  });
}

  EraseGalaxyName(galaxyName : string){
    this.galaxies.forEach((element: Galaxy) => {
      if(element.name == galaxyName){
        const paragraphName = galaxyName + "Name";
        const element = document.getElementById(paragraphName.toString()) as HTMLParagraphElement;
        if (element) {

          element.classList.remove('fade-in');
          element.classList.remove('visible');

          element.classList.add('shown');
  

          setTimeout(() => {
            element.classList.remove('shown');
            element.classList.add('gone'); 
          }, 10);
        }
      }
    });
  }
}
