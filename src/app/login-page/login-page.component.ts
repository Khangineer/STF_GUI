import { Component, OnInit } from '@angular/core';
import { PinataSDK } from "pinata-web3";
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetaMaskSDK } from "@metamask/sdk";
import { env } from '../../../env';
import { LoggedUserDataService } from '../../../resources/logged-user-data.service';
import { User } from '../../../Models/User';
import { AppComponent } from '../app.component';
import { registeredSpacecraftModels } from '../../../Models/Spacecraft';
import { resources, startingResources } from '../../../Models/Resource';
import { CeramicService } from '../services/ceramic.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  MetaMaskSDK: any;
  PinataSDK: any;
  UserAccount: string = '';
  documentId: string = '';

  title: string = "STF";
  accountConnected: boolean = false;
  loginNeeded: boolean = false;
  registerNeeded: boolean = false;
  myForm: FormGroup;
  private routerAN: Router;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loggeduserData: LoggedUserDataService,
    private appC: AppComponent,
    private ceramicService: CeramicService
  ) {
    this.myForm = this.fb.group({
      password: ['']
    });
    this.routerAN = router;
    appC.SetLoggedUser(null);
  }

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

  async ConnectMetaMask() {
    const accounts = await this.MetaMaskSDK.request({ method: 'eth_requestAccounts' });
    this.UserAccount = accounts[0];

    if (this.UserAccount) {
      this.accountConnected = true;
      
      try {
        // Authenticate with Ceramic
        await this.ceramicService.authenticate(this.UserAccount);
        
        // Try to load existing user data
        const existingDocs = await this.ceramicService.queryUserDocuments(this.UserAccount);
        
        if (existingDocs && existingDocs.length > 0) {
          this.documentId = existingDocs[0];
          this.loginNeeded = true;
        } else {
          this.registerNeeded = true;
        }
      } catch (error) {
        console.error('Error connecting to Ceramic:', error);
      }
    }
  }

  async Login() {
    if (this.loginNeeded && this.documentId) {
      try {
        const userData = await this.ceramicService.getUserData(this.documentId);
        this.loggeduserData.loggedUserModelInstance = userData;
        this.loggeduserData.loggedUserWalletAddress = this.UserAccount;
        
        console.log('User data loaded:', userData);
        this.routerAN.navigate(['/colonies']);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }

  async Register() {
    if (this.registerNeeded) {
      try {
        // Create initial user data
        const initialUserData = {
          walletAddress: this.UserAccount,
          ownedSpacecrafts: [],
          storedResources: {},
          ownedColonies: [],
          onwedParts: {},
          reputation: 0
        };

        // Store the data in Ceramic
        this.documentId = await this.ceramicService.storeUserData(initialUserData);
        
        // Update local instance
        this.loggeduserData.loggedUserModelInstance = initialUserData;
        this.loggeduserData.loggedUserWalletAddress = this.UserAccount;
        
        console.log('New user registered:', initialUserData);
        this.routerAN.navigate(['/colonies']);
      } catch (error) {
        console.error('Error registering new user:', error);
      }
    }
  }
}
