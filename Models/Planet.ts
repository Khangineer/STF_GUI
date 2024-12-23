import { Colony } from "./Colony";
import { Galaxy } from "./Galaxy";

export interface Planet{
    U_PID : number; //Unique Planet Id
    name : string;
    parentGalaxy : Galaxy;
    colonyBank : Colony[];
}