import { Component, OnInit } from '@angular/core';
import { PinataSDK } from "pinata-web3";
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetaMaskSDK } from "@metamask/sdk";
import Gun from 'gun';
import 'gun/sea';
import { env } from '../../../env';
import { LoggedUserDataService } from '../../../resources/logged-user-data.service';
import { User } from '../../../Models/User';
import { AppComponent } from '../app.component';
import { registeredSpacecraftModels } from '../../../Models/Spacecraft';
import { resources } from '../../../Models/Resource';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit{

  MetaMaskSDK : any;
  PinataSDK : any;
  UserAccount : any;

  title : string = "STF";
  accountConnected : boolean = false;
  loginNeeded : boolean = false;
  registerNeeded : boolean = false;
  myForm: FormGroup;
  private routerAN : Router;

  ngOnInit(): void {
      this.PinataSDK = new PinataSDK({
        pinataJwt: env.JWT,
        pinataGateway: "brown-faithful-shrimp-92.mypinata.cloud",
      });
  
      const MMSDK = new MetaMaskSDK({
        dappMetadata: {
          name: "STF",
          url: window.location.href,
        },
        infuraAPIKey: env.INFURA_API_KEY,
      });
      setTimeout(() => {
        MMSDK.init().then(() => {
          this.MetaMaskSDK = MMSDK.getProvider();   
        });
      }, 0);
    }

    
  constructor(private fb : FormBuilder, private router : Router, private loggeduserData : LoggedUserDataService, private appC : AppComponent){
      this.myForm = this.fb.group({
        password: ['']
      });
      this.routerAN = router;
      appC.SetLoggedUser(null);
    }
  
  async ConnectMetaMask(){
    await this.MetaMaskSDK.request({ method: 'eth_requestAccounts' }).then((accounts : any) => {    
      this.UserAccount = accounts[0];
    });

    if(this.UserAccount != null){
      const gun = Gun();
      this.accountConnected = true;

      gun.get(`~@${this.UserAccount + "STFA"}`).once(data => {
        if (data) {
          this.loginNeeded = true;
        } else {
          this.registerNeeded = true;
        }
      });
    }
  }

  async Login(){
    const gun = Gun();
    const user = gun.user();
    const SEA = Gun.SEA;
    
    if(this.loginNeeded){
      user.auth(this.UserAccount + "STFA", this.myForm.get('password')?.value, (ack) =>{
        if ('err' in ack) {
          console.log(ack.err);
        } else {
          console.log("zalogowano");
          this.loggeduserData.loggedUserWalletAddress = this.UserAccount;
          this.loggeduserData.loggedUserWalletAddressSTFA = this.UserAccount + "STFA";
          this.loggeduserData.loggedUserGunInstance = user

          const xd = new Map([
            [1400, resources[0]],
            [200, resources[1]],
            [50, resources[30]],
        ]);
        
        // Konwersja Map na obiekt dla serializacji
        const xd2 = JSON.stringify(Object.fromEntries(xd));
        console.log(xd2);

        const userModel : User = {
          walletAddress: this.UserAccount,
          reputation: 0,
          ownedSpacecrafts: [
            registeredSpacecraftModels.get("Pioneer")!, registeredSpacecraftModels.get("Vexilris")!, registeredSpacecraftModels.get("Hepatos")!
          ],
        }
        const jsonModel = JSON.stringify(userModel);
        console.log(jsonModel);
        console.log(xd2);
        
        const obj1 = JSON.parse(jsonModel);
        console.log(obj1);

        const obj2 = JSON.parse(xd2);
        console.log(obj2);
        const reski = {"storedResources": obj2};
        const rr = {...obj1, ...reski};
        console.log(rr);

        user.get(this.loggeduserData.loggedUserWalletAddressSTFA).put((JSON.stringify(rr)), (ack) => {
          user.get(this.loggeduserData.loggedUserWalletAddressSTFA).once((data) => {
            console.log(data);
            console.log("wyzej z bazy");
          })
          this.routerAN.navigate(['/colonies']);
        });


        }
      });

    }
    else{
      user.create(this.UserAccount + "STFA", this.myForm.get('password')?.value, ack => {
        user.auth(this.UserAccount + "STFA", this.myForm.get('password')?.value, (ack) =>{
          if ('err' in ack) {
            console.log('Tutaj:', ack);
          } else {
            console.log("zalogowano");
            this.loggeduserData.loggedUserWalletAddress = this.UserAccount;
            this.loggeduserData.loggedUserWalletAddressSTFA = this.UserAccount + "STFA";
            this.loggeduserData.loggedUserGunInstance = user;
  
            const userModel : User = {
              walletAddress: this.UserAccount,
              reputation: 0,
              ownedSpacecrafts: [
                registeredSpacecraftModels.get("Pioneer")!,
              ],
            }
            
            user.get(this.loggeduserData.loggedUserWalletAddressSTFA).put(JSON.stringify(userModel), (ack) => {
              this.loggeduserData.loggedUserModelInstance = userModel;
              this.routerAN.navigate(['/colonies']);
            });
          }
        });
      });

    }
  }
}

