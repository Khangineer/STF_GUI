import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserDataService {
  loggedUserWalletAddress : string = "not_assigned";
  loggedUserWalletAddressSTFA : string = "not_assignedA"
  loggedUserGunInstance : any;
  loggedUserModelInstance : any;
  constructor() { }
}