export interface Spacecraft{
    U_SID : number; // Unique Spacecraft Id
    name : string;
    hasHyperdrive : boolean;
    capacity: number;
    attackPower : number;
    imagePinata_CID: string;
}

export const registeredSpacecraftModels = new Map<string, Spacecraft>([
    [
        "Pioneer",
        {
            U_SID: 0,
            name: "Pioneer",
            hasHyperdrive: false,
            capacity: 4000,
            attackPower: 2,
            imagePinata_CID: "bafybeieip74a66t2i33ovck7igngb7w6vdavxemeck5lfih3ik5mccxqcm",
        },
    ],
    [   //TODO wygenerować z AI obrazki dla tych dwóch statków, wrzucić je na Pinata i nadać tutaj odpowiedni CID
        "Vexilris",
        {
            U_SID: 1,
            name: "Vexilris",
            hasHyperdrive: true,
            capacity: 10000,
            attackPower: 30,
            imagePinata_CID: "bafybeih7z4pundowwvpcaf46mbow33mdaavv6ocxpk673esogk72vywbxa",
        },
    ],
    [
        "Hepatos",
        {
            U_SID: 2,
            name: "Hepatos",
            hasHyperdrive: false,
            capacity: 20000,
            attackPower: 1,
            imagePinata_CID: "bafybeia6tjwkuv7zh77n256idimggcsrgmzjsky2wrc5kisirty4hrbjhu",
        },
    ],
]);