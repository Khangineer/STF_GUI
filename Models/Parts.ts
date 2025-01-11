import { Resource, resources } from "./Resource"

export interface Part {
    U_PID : number
    name : string
    imagePinata_CID : string
    quantity? : number
    isNecessaryForHyperdriveConstruction : boolean
    requiredResources : Map<number, Resource>
}

export const registeredPartsModels = new Map<string, Part>([
    [
        "Omega Drive Coil",
        {
            U_PID: 0,
            name: "Omega Drive Coil",
            imagePinata_CID: "bafkreif6heubot45zhdidzpolk7q3dngsg4wkdg45ydu4a5rs4pvjs5pju",
            isNecessaryForHyperdriveConstruction: true,
            requiredResources: new Map<number, Resource>([
                [250, resources[22]], [50, resources[26]], [50, resources[48]]  
            ])
        }
    ],
    [
        //Main Hyperdrive element
        "Omega Drive Chassis",  
        {
            U_PID: 1,
            name: "Omega Drive Chassis",
            imagePinata_CID: "bafybeiahd4pun75vga3uozhtdun7onjemkg5vt7li7wn27gqy7z7ejnrxa",
            isNecessaryForHyperdriveConstruction: true,
            requiredResources: new Map<number, Resource>([
                [10000, resources[27]], [100, resources[37]], [800, resources[46]]    
            ])
        }
    ],
    [
        "Omega Drive Core",
        {
            U_PID: 2,
            name: "Omega Drive Core",
            imagePinata_CID: "bafybeiecuhjlisnhakjvjsuccrwd5fbgmnvgfmsqfxj7tk7fglvkdzfsqa",
            isNecessaryForHyperdriveConstruction: true,
            requiredResources: new Map<number, Resource>([
                [2000, resources[0]], [200, resources[30]], [100, resources[37]] 
            ])
        }
    ],
    [
        "Aurora Glow Beacons",
        {
            U_PID: 3,
            name: "Aurora Glow Beacons",
            imagePinata_CID: "bafkreig6h3i4s5tzj47veyskqobgb4cl7rcv7g6m6nvtcdxk7mb4qakdoi",
            isNecessaryForHyperdriveConstruction: false,
            requiredResources: new Map<number, Resource>([
                [400, resources[6]], [50, resources[30]], [300, resources[31]] 
            ])
        }
    ],
    [
        "Nebular Energy Shield Generator",
        {
            U_PID: 4,
            name: "Nebular Energy Shield Generator",
            imagePinata_CID: "bafkreie5ionpmd2u6dvdk7wtimpoji5e4y4naetkk6sdiw5bmgbpy4hbjq",
            isNecessaryForHyperdriveConstruction: false,
            requiredResources: new Map<number, Resource>([
                [150, resources[0]], [300, resources[47]], [500, resources[48]] 
            ])
        }
    ],
    [
        "Magnorite Armor Plating",
        {
            U_PID: 5,
            name: "Magnorite Armor Plating",
            imagePinata_CID: "bafybeibaao34kaqarx5e2kbxibldiy24zu2ycgma7jy5fbsny5iwthonhm",
            isNecessaryForHyperdriveConstruction: false,
            requiredResources: new Map<number, Resource>([
                [150, resources[11]], [30, resources[35]]
            ])
        }
    ],
    [
        "CryoVault Preservation Systems",
        {
            U_PID: 6,
            name: "CryoVault Preservation Systems",
            imagePinata_CID: "bafkreiac6fuopemgp576vjy746s3dgqd6zu5b6buwe5232eru7gquybtne",
            isNecessaryForHyperdriveConstruction: false,
            requiredResources: new Map<number, Resource>([ 
                [5000, resources[22]], [300, resources[17]], [500, resources[50]], [350, resources[37]], [400, resources[19]] 
            ])
        }
    ]
]);

export const Hyperdrive = {
    imagePinata_CID: "bafkreicd7draovcg3oskj46t6ygosdkh4i3mz2feaejwf4gb35d6lhnuc4",
    requiredParts : new Map<number, Part>([
        [15, registeredPartsModels.get("Omega Drive Coil") as Part],
        [1, registeredPartsModels.get("Omega Drive Chassis") as Part],
        [1, registeredPartsModels.get("Omega Drive Core") as Part],
    ])
};