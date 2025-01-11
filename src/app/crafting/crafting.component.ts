import { Component, OnInit } from '@angular/core';
import { LoggedUserDataService } from '../../../resources/logged-user-data.service';
import { Part, registeredPartsModels } from '../../../Models/Parts';
import { PinataSDK } from 'pinata-web3';
import { env } from '../../../env';

@Component({
  selector: 'app-crafting',
  standalone: true,
  imports: [],
  templateUrl: './crafting.component.html',
  styleUrl: './crafting.component.css'
})
export class CraftingComponent implements OnInit {

  resources : any;
  starships : any;
  partsOwned : any;
  partsAll : any;
  clickedPartImage : any;
  clickedPartName : string = "";
  constructor(private loggedUserData : LoggedUserDataService){
    this.resources = loggedUserData.loggedUserModelInstance.storedResources;
    this.starships = loggedUserData.loggedUserModelInstance.ownedSpacecrafts;
    this.partsOwned = loggedUserData.loggedUserModelInstance.onwedParts;
  }

  ngOnInit(){
    this.partsAll = Array.from(registeredPartsModels.values());
  }
  
  
  async showPartInfo(U_PID : number){
    const pinata = new PinataSDK({
      pinataJwt: env.JWT,
      pinataGateway: "brown-faithful-shrimp-92.mypinata.cloud",
    });
    
    this.partsAll.forEach(async (element: any) => {
      if(element.U_PID == U_PID){
        const { data, contentType } = await pinata.gateways.get(
          element.imagePinata_CID!
        );
        this.clickedPartName = element.name;

        if (data instanceof Blob) {
          this.clickedPartImage = window.URL.createObjectURL(data);
        } else {
            console.error("Dane nie są typem Blob, nieCanBeConverted URL.");
        }
      }
    });
  }

  CraftPart(){
    console.log("Crafting part");
  }


}
