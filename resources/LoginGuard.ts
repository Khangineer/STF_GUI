import { inject } from "@angular/core";
import { DashboardComponent } from "../src/app/dashboard/dashboard.component";
import { Router } from "@angular/router";
import { LoggedUserDataService } from "./logged-user-data.service";

export const LoginGuard = () => {
  
  const router = inject(Router);
  const loggedUserData = inject(LoggedUserDataService);
  if(loggedUserData.loggedUserWalletAddress != "not_assigned" && loggedUserData.loggedUserWalletAddressSTFA != "not_assignedA"){
    return true;
  }
  else{
    router.navigate([""]);
    return false;
  }
}
