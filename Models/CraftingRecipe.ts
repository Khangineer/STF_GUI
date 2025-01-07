import { Hyperdrive, Part, registeredPartsModels } from "./Parts"
import { registeredSpacecraftModels } from "./Spacecraft";

export interface CraftingRecipie {
    U_CRID : number
    name : string
    requiredParts : Map<number, Part>
    hyperdrive? : any;
}

export const craftingRecipies : CraftingRecipie[] = [
    {
        U_CRID : 0,
        name : registeredSpacecraftModels.get("Pioneer")?.name!,
        requiredParts : new Map([
            [20, registeredPartsModels.get("Magnorite Armor Plating") as Part],
            [10, registeredPartsModels.get("Aurora Glow Beacons") as Part],
            [1, registeredPartsModels.get("CryoVault Preservation Systems") as Part],
        ]),
    },
    {
        U_CRID : 1,
        name : registeredSpacecraftModels.get("Vexilris")?.name!,
        requiredParts : new Map([
            [15, registeredPartsModels.get("Aurora Glow Beacons") as Part],
            [1, registeredPartsModels.get("Nebular Energy Shield Generator") as Part],
            [70, registeredPartsModels.get("Magnorite Armor Plating") as Part],
        ]),
        hyperdrive : Hyperdrive,
    },
    {
        U_CRID : 2,
        name : registeredSpacecraftModels.get("Hepatos")?.name!,
        requiredParts : new Map([
            [35, registeredPartsModels.get("Magnorite Armor Plating") as Part],
            [1, registeredPartsModels.get("CryoVault Preservation Systems") as Part],
            [1, registeredPartsModels.get("Nebular Energy Shield Generator") as Part],
            [20, registeredPartsModels.get("Aurora Glow Beacons") as Part],
        ]),
    },
];
