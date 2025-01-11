import { Colony } from "./Colony";
import { Part } from "./Parts";
import { Resource } from "./Resource";
import { Spacecraft } from "./Spacecraft";

export interface User{
    walletAddress : string;
    ownedSpacecrafts? : Spacecraft[];
    storedResources? : Map<number, Resource>;
    ownedColonies? : Colony[];
    onwedParts? : Map<number, Part>;
    reputation : number;
}