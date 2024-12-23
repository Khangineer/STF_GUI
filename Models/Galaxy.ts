import { Planet } from "./Planet";

export interface Galaxy{
    U_GID : number; // Unique Galaxy Id
    name : string;
    planetBank : Planet[];
}