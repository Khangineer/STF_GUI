import { Injectable } from '@angular/core';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserDataService {
  loggedUserWalletAddress: string = "not_assigned";
  loggedUserModelInstance: User | null = null;
  documentId: string | null = null;
  loggedUserWalletAddressSTFA : string = "not_assignedA"

  constructor() { }
}