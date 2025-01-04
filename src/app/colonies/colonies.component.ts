import { Component, OnInit } from '@angular/core';
import { LoggedUserDataService } from '../../../resources/logged-user-data.service';
import Gun from 'gun';
import 'gun/sea';
import { PinataSDK } from 'pinata-web3';
import { env } from '../../../env';
import { Galaxy } from '../../../Models/Galaxy';
import { Planet } from '../../../Models/Planet';
import { Resource } from '../../../Models/Resource';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-colonies',
  standalone: true,
  imports: [],
  templateUrl: './colonies.component.html',
  styleUrl: './colonies.component.css'
})
export class ColoniesComponent implements OnInit{
  colonies : any;
  file!: File;
  imageUrl: string | null = null;
  isImage: boolean = false;
  constructor(private loggedUserData : LoggedUserDataService, private appC : AppComponent){
    appC.SetLoggedUser("logged");
  }

  ngOnInit(): void {
    this.loggedUserData.loggedUserGunInstance.get(this.loggedUserData.loggedUserWalletAddressSTFA).once((data: any) => {
      this.colonies = data.ownedColonies;
      console.log(this.colonies);
      console.log("wyzej kolonie");
    });
  }

}
