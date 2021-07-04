import {Crop, Field, HumusStatus} from "../../../types";

export type State = {
    allCrops: Array<Crop>,
    originalFields: Array<Field>,
    fields: Array<Field>,
    isLoading: boolean,
    humusStatus: HumusStatus[],
    humusBalanceChanged: boolean,
    humusBalanceBetter: boolean,
    humusBalanceWorst: boolean
}
export type StateReducer = {
    table: {
        allCrops: Array<Crop>,
        originalFields: Array<Field>,
        fields: Array<Field>,
        isLoading: boolean,
        humusStatus: HumusStatus[],
        humusBalanceChanged: boolean,
        humusBalanceBetter: boolean,
        humusBalanceWorst: boolean
    }
}

export const initialState = {
    allCrops: [],
    originalFields: [],
    fields: [],
    isLoading: true,
    humusStatus: [],
    humusBalanceChanged: false,
    humusBalanceBetter: false,
    humusBalanceWorst: false
}