import {Crop, Field, HumusStatus} from "../../../types";

export type State = {
    allCrops: Array<Crop>,
    prevFields: Array<Field>,
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
        prevFields: Array<Field>,
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
    prevFields: [],
    fields: [],
    isLoading: true,
    humusStatus: [],
    humusBalanceChanged: false,
    humusBalanceBetter: false,
    humusBalanceWorst: false
}