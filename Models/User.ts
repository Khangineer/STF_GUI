import { Colony } from "./Colony";
import { Resource } from "./Resource";
import { Spacecraft } from "./Spacecraft";

export interface User{
    walletAddress : string;
    ownedSpacecrafts? : Spacecraft[];
    ownedResources? : Resource[];
    ownedColonies? : Colony[];
    reputation : number;
}