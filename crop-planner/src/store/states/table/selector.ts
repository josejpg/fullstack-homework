import {StateReducer} from "./state";
import {Crop, Field, HumusStatus} from "../../../types";

export const selectAllCrops = (state: StateReducer) => state.table.allCrops as Crop[];
export const selectOriginalFields = (state: StateReducer) => state.table.originalFields as Field[];
export const selectFields = (state: StateReducer) => state.table.fields as Field[]
export const selectLoading = (state: StateReducer) => state.table.isLoading as boolean;
export const selectHumusSatus = (state: StateReducer) => state.table.humusStatus as HumusStatus[];
export const selectHumusBalanceChanged = (state: StateReducer) => state.table.humusBalanceChanged as boolean;
export const selectHumusBalanceBetter = (state: StateReducer) => state.table.humusBalanceBetter as boolean;
export const selectHumusBalanceWorst = (state: StateReducer) => state.table.humusBalanceWorst as boolean;