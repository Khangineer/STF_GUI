import { Colony } from "./Colony";
import { Galaxy } from "./Galaxy";
import { resources } from "./Resource";

export interface Planet{
    U_PID : number; //Unique Planet Id
    name : string;
    colonyBank? : Colony[];
}

export const planets: Planet[] = [
    {
        U_PID: 0, name: "Selene",
        colonyBank: [
            { U_CID: 0, name: "C-001", resourceBank: [resources[0], resources[1]] },
            { U_CID: 1, name: "C-002", resourceBank: [resources[1], resources[2]] },
            { U_CID: 2, name: "C-003", resourceBank: [resources[5], resources[6]] },
            { U_CID: 3, name: "C-004", resourceBank: [resources[2], resources[8]] },
        ]
    },
    {
        U_PID: 1, name: "Vastoria",
        colonyBank: [
            { U_CID: 4, name: "C-005", resourceBank: [resources[0], resources[2]] },
            { U_CID: 5, name: "C-006", resourceBank: [resources[4], resources[3]] },
            { U_CID: 6, name: "C-007", resourceBank: [resources[7], resources[4]] },
            { U_CID: 7, name: "C-008", resourceBank: [resources[9], resources[1]] },
        ]
    },
    {
        U_PID: 2, name: "Phoenix",
        colonyBank: [
            { U_CID: 8, name: "C-009", resourceBank: [resources[9], resources[2]] },
            { U_CID: 9, name: "C-010", resourceBank: [resources[8], resources[10]] },
            { U_CID: 10, name: "C-011", resourceBank: [resources[12], resources[4]] },
            { U_CID: 11, name: "C-012", resourceBank: [resources[14], resources[15]] },
        ]
    },
    {
        U_PID: 3, name: "Eldonox",
        colonyBank: [
            { U_CID: 12, name: "C-013", resourceBank: [resources[21], resources[4]] },
            { U_CID: 13, name: "C-014", resourceBank: [resources[23], resources[1]] },
            { U_CID: 14, name: "C-015", resourceBank: [resources[19], resources[7]] },
        ]
    },
    {
        U_PID: 4, name: "Celestara",
        colonyBank: [
            { U_CID: 15, name: "C-016", resourceBank: [resources[49], resources[4]] },
            { U_CID: 16, name: "C-017", resourceBank: [resources[9], resources[17]] },
        ]
    },
];