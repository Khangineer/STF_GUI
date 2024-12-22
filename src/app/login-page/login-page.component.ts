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

    
  constructor(private fb : FormBuilder, private router : Router, private loggeduserData : LoggedUserDataService){
      this.myForm = this.fb.group({
        password: ['']
      });
      this.routerAN = router;
    }

  async ConnectMetaMask(){
    await this.MetaMaskSDK.request({ method: 'eth_requestAccounts' }).then((accounts : any) => {    
      this.UserAccount = accounts[0];
    });

    if(this.UserAccount != null){
      const gun = Gun();
      this.accountConnected = true;

      gun.get(`~@${this.UserAccount + "STF"}`).once(data => {
        console.log(data);
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
      user.auth(this.UserAccount + "STF", this.myForm.get('password')?.value, (ack) =>{
        if ('err' in ack) {
          // Niepoprawne hasło
        } else {
          console.log("zalogowano");
          this.loggeduserData.loggedUserWalletAddress = this.UserAccount;
          this.loggeduserData.loggedUserWalletAddressSTF = this.UserAccount + "STF";
          this.routerAN.navigate(['/dashboard']);
        }
      });
    }
    else{
      user.create(this.UserAccount + "STF", this.myForm.get('password')?.value, ack => {
        if (ack) {
          console.log('Error:', ack);
        } else {
          console.log('User created successfully:', ack);
        }
      });
    }
  }
}

