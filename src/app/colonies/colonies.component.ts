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
    console.log(this.loggedUserData.loggedUserModelInstance);
  }

  ngOnInit(): void {
    this.loggedUserData.loggedUserGunInstance.get(this.loggedUserData.loggedUserWalletAddressSTFA).once((data: any) => {
      this.colonies = data.ownedColonies;
    });
  }

  async SD(){

    /*
    const resources: Resource[] = [
      { U_RID: 0, name: "Velirium", quality: 1, isNecessaryForHyperdriveContruction: false, weight: 5 },
      { U_RID: 1, name: "Quemitum", quality: 4, isNecessaryForHyperdriveContruction: false, weight: 2 },
      { U_RID: 2, name: "Filris", quality: 2, isNecessaryForHyperdriveContruction: false, weight: 10 },
      { U_RID: 3, name: "Zynetherium", quality: 5, isNecessaryForHyperdriveContruction: true, weight: 1 },
      { U_RID: 4, name: "Voidium", quality: 1, isNecessaryForHyperdriveContruction: false, weight: 7 },
      { U_RID: 5, name: "Heliplasma", quality: 3, isNecessaryForHyperdriveContruction: false, weight: 4 },
      { U_RID: 6, name: "Lithium", quality: 2, isNecessaryForHyperdriveContruction: false, weight: 3 },
      { U_RID: 7, name: "Novaquartz", quality: 4, isNecessaryForHyperdriveContruction: false, weight: 2 },
      { U_RID: 8, name: "Trionium", quality: 3, isNecessaryForHyperdriveContruction: false, weight: 6 },
      { U_RID: 9, name: "Solarite", quality: 5, isNecessaryForHyperdriveContruction: false, weight: 1 },
      { U_RID: 10, name: "Crytex", quality: 4, isNecessaryForHyperdriveContruction: true, weight: 2 },
      { U_RID: 11, name: "Magnorite", quality: 2, isNecessaryForHyperdriveContruction: false, weight: 8 },
      { U_RID: 12, name: "Hedrite", quality: 3, isNecessaryForHyperdriveContruction: false, weight: 6 },
      { U_RID: 13, name: "Crytosis", quality: 1, isNecessaryForHyperdriveContruction: false, weight: 3 },
      { U_RID: 14, name: "Astheriumite", quality: 2, isNecessaryForHyperdriveContruction: false, weight: 7 },
      { U_RID: 15, name: "Starilite", quality: 4, isNecessaryForHyperdriveContruction: false, weight: 2 },
      { U_RID: 16, name: "Cryoflux", quality: 1, isNecessaryForHyperdriveContruction: false, weight: 6 },
      { U_RID: 17, name: "Zytherium", quality: 3, isNecessaryForHyperdriveContruction: false, weight: 5 },
      { U_RID: 18, name: "Thalium", quality: 3, isNecessaryForHyperdriveContruction: false, weight: 4 },
      { U_RID: 19, name: "Trilinium", quality: 6, isNecessaryForHyperdriveContruction: true, weight: 1 },
      { U_RID: 20, name: "Obsidianite", quality: 2, isNecessaryForHyperdriveContruction: false, weight: 5 },
      { U_RID: 21, name: "Solarium", quality: 4, isNecessaryForHyperdriveContruction: true, weight: 2 },
      { U_RID: 22, name: "Cytharite", quality: 1, isNecessaryForHyperdriveContruction: false, weight: 10 },
      { U_RID: 23, name: "Proxium", quality: 3, isNecessaryForHyperdriveContruction: false, weight: 8 },
      { U_RID: 24, name: "Asterite", quality: 5, isNecessaryForHyperdriveContruction: true, weight: 1 },
      { U_RID: 25, name: "Mercurium", quality: 3, isNecessaryForHyperdriveContruction: false, weight: 7 },
      { U_RID: 26, name: "Aetherium", quality: 5, isNecessaryForHyperdriveContruction: false, weight: 2 },
      { U_RID: 27, name: "Solvium", quality: 2, isNecessaryForHyperdriveContruction: false, weight: 8 },
      { U_RID: 28, name: "Luminite", quality: 3, isNecessaryForHyperdriveContruction: false, weight: 6 },
      { U_RID: 29, name: "Eonianite", quality: 4, isNecessaryForHyperdriveContruction: true, weight: 1 },
      { U_RID: 30, name: "Draconium", quality: 6, isNecessaryForHyperdriveContruction: true, weight: 1 },
      { U_RID: 31, name: "Electrum", quality: 3, isNecessaryForHyperdriveContruction: false, weight: 9 },
      { U_RID: 32, name: "Astrostone", quality: 3, isNecessaryForHyperdriveContruction: false, weight: 7 },
      { U_RID: 33, name: "Vesmatron", quality: 4, isNecessaryForHyperdriveContruction: false, weight: 3 },
      { U_RID: 34, name: "Zarathium", quality: 3, isNecessaryForHyperdriveContruction: false, weight: 4 },
      { U_RID: 35, name: "Ioidium", quality: 2, isNecessaryForHyperdriveContruction: false, weight: 3 },
      { U_RID: 36, name: "Zalthonium", quality: 4, isNecessaryForHyperdriveContruction: true, weight: 2 },
      { U_RID: 37, name: "Nephyr", quality: 1, isNecessaryForHyperdriveContruction: false, weight: 6 },
      { U_RID: 38, name: "Neutrine", quality: 1, isNecessaryForHyperdriveContruction: false, weight: 5 },
      { U_RID: 39, name: "Astralite", quality: 4, isNecessaryForHyperdriveContruction: true, weight: 2 },
      { U_RID: 40, name: "Cosmolite", quality: 2, isNecessaryForHyperdriveContruction: false, weight: 9 },
      { U_RID: 41, name: "Iridium", quality: 3, isNecessaryForHyperdriveContruction: false, weight: 6 },
      { U_RID: 42, name: "Draconite", quality: 1, isNecessaryForHyperdriveContruction: false, weight: 6 },
      { U_RID: 43, name: "Vulcrite", quality: 2, isNecessaryForHyperdriveContruction: false, weight: 3 },
      { U_RID: 44, name: "Drexium", quality: 4, isNecessaryForHyperdriveContruction: false, weight: 2 },
      { U_RID: 45, name: "Moltexium", quality: 2, isNecessaryForHyperdriveContruction: false, weight: 7 },
      { U_RID: 46, name: "Cryphium", quality: 3, isNecessaryForHyperdriveContruction: false, weight: 9 },
      { U_RID: 47, name: "Solstice", quality: 4, isNecessaryForHyperdriveContruction: false, weight: 3 },
      { U_RID: 48, name: "Nebulite", quality: 3, isNecessaryForHyperdriveContruction: false, weight: 5 },
      { U_RID: 49, name: "Quantumite", quality: 5, isNecessaryForHyperdriveContruction: true, weight: 1 },
      { U_RID: 50, name: "Zanovite", quality: 2, isNecessaryForHyperdriveContruction: false, weight: 6 },
  ];

  const planets: Planet[] = [
    {
        U_PID: 0, name: "Selene",
        colonyBank: [
            { U_CID: 0, name: "C-001", resourceBank: [resources[0], resources[1]] },
            { U_CID: 1, name: "C-002", resourceBank: [resources[1], resources[2]] },
            { U_CID: 2, name: "C-003", resourceBank: [resources[5], resources[6]] },
            { U_CID: 3, name: "C-004", resourceBank: [resources[2], resources[8]] },
        ]
    },
    {
        U_PID: 1, name: "Vastoria",
        colonyBank: [
            { U_CID: 4, name: "C-005", resourceBank: [resources[0], resources[2]] },
            { U_CID: 5, name: "C-006", resourceBank: [resources[4], resources[3]] },
            { U_CID: 6, name: "C-007", resourceBank: [resources[7], resources[4]] },
            { U_CID: 7, name: "C-008", resourceBank: [resources[9], resources[1]] },
        ]
    },
    {
        U_PID: 2, name: "Phoenix",
        colonyBank: [
            { U_CID: 8, name: "C-009", resourceBank: [resources[9], resources[2]] },
            { U_CID: 9, name: "C-010", resourceBank: [resources[8], resources[10]] },
            { U_CID: 10, name: "C-011", resourceBank: [resources[12], resources[4]] },
            { U_CID: 11, name: "C-012", resourceBank: [resources[14], resources[15]] },
        ]
    },
    {
        U_PID: 3, name: "Eldonox",
        colonyBank: [
            { U_CID: 12, name: "C-013", resourceBank: [resources[21], resources[4]] },
            { U_CID: 13, name: "C-014", resourceBank: [resources[23], resources[1]] },
            { U_CID: 14, name: "C-015", resourceBank: [resources[19], resources[7]] },
        ]
    },
    {
        U_PID: 4, name: "Celestara",
        colonyBank: [
            { U_CID: 15, name: "C-016", resourceBank: [resources[49], resources[4]] },
            { U_CID: 16, name: "C-017", resourceBank: [resources[9], resources[17]] },
        ]
    },
];

  const galaxy: Galaxy = { U_GID: 0, name: "Tectaforma", planetBank: planets };

  const file = new File([JSON.stringify(galaxy)], "Galaxy_Tectaforma", {type: "text/plain"});

  const pinata = new PinataSDK({
    pinataJwt: env.JWT,
    pinataGateway: "brown-faithful-shrimp-92.mypinata.cloud",
  })

  try {
    const upload = await pinata.upload.file(file);
    console.log(upload);
  } catch (error) {
    console.log(error);
  }
  
  */


  }

  async onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.file = file!;

    const pinata = new PinataSDK({
      pinataJwt: env.JWT,
      pinataGateway: "brown-faithful-shrimp-92.mypinata.cloud",
    })
  
    try {
      const response = await pinata.upload.file(this.file);
  
      console.log(response);
    } catch (error) {
      console.error("Wystąpił błąd podczas przesyłania pliku:", error);
    }
  }
}
