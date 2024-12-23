export interface Resource{
    U_RID : number; //Unique Resource Id
    quality : number;
    name : String;
    isNecessaryForHyperdriveContruction : boolean;  //specjalne zasoby niezbędne do budowy napędu międzygwiezdnego statku bez niego nie może zmieniać galaktyk
    weight: number;
}