import { Planet, planets } from "./Planet";

export interface Galaxy{
    U_GID : number; // Unique Galaxy Id
    name : string;
    planetBank? : Planet[];
}

export const galaxy: Galaxy = { U_GID: 0, name: "Tectaforma", planetBank: planets };