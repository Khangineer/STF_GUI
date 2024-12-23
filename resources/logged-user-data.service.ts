import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserDataService {
  loggedUserWalletAddress : string = "not_assigned";
  loggedUserWalletAddressSTF : string = "not_assigned"
  loggedUser : any;
  constructor() { }
}