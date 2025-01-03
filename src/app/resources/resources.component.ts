import { Component, OnInit } from '@angular/core';
import { LoggedUserDataService } from '../../../resources/logged-user-data.service';
import { ResourcePair } from '../../../Models/Resource';
import { PinataSDK } from 'pinata-web3';
import { env } from '../../../env';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent implements OnInit{

  resources : any;

  constructor(private loggedUserData : LoggedUserDataService){
    this.resources = Object.entries(loggedUserData.loggedUserModelInstance.storedResources);
    console.log(this.resources);
  }
  async ngOnInit() {
    this.resources.forEach(async ([key, element]: ResourcePair) => {
      console.log(element);

      const pinata = new PinataSDK({
      pinataJwt: env.JWT,
      pinataGateway: "brown-faithful-shrimp-92.mypinata.cloud",
    });
    
    const { data, contentType } = await pinata.gateways.get(
      element.imagePinata_CID!
    )

    if (data instanceof Blob) {
      const url = window.URL.createObjectURL(data);
      const img = document.getElementById(element.U_RID.toString()) as HTMLImageElement;
      img.src = url;
    } else {
        console.error("Dane nie są typem Blob, nie można utworzyć URL.");
    }
    })
  }

}
