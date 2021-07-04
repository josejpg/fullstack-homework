import {createSlice, Draft} from "@reduxjs/toolkit";
import {initialState, State} from "./state";

const { actions, reducer } = createSlice({
    name: 'table',
    initialState: initialState,
    reducers: {
        setCrops: (state: Draft<State>, { payload }) => {
            state.allCrops = payload
        },
        setOriginalFields: (state: Draft<State>, { payload }) => {
            state.originalFields = payload
        },
        setFields: (state: Draft<State>, { payload }) => {
            state.fields = payload
        },
        setLoader: (state: Draft<State>, { payload }) => {
            state.isLoading = payload
        },
        setHumusStatus: (state: Draft<State>, { payload }) => {
            state.humusStatus = payload;
        },
        setHumusBalanceChanged: (state: Draft<State>, { payload }) => {
            state.humusBalanceChanged = payload
        },
        sethumusBalanceBetter: (state: Draft<State>, { payload }) => {
            state.humusBalanceBetter = payload
        },
        setHumusBalanceWorst: (state: Draft<State>, { payload }) => {
            state.humusBalanceWorst = payload
        },
        setHumusState: (state: Draft<State>, { payload }) => {
            state.humusStatus = payload.humusStatus;
            state.humusBalanceChanged = payload.humusBalanceChanged
            state.humusBalanceBetter = payload.humusBalanceBetter
            state.humusBalanceWorst = payload.humusBalanceWorst
        },
    }
})

export default reducer;

export const {
    setCrops,
    setOriginalFields,
    setFields,
    setLoader,
    setHumusStatus,
    setHumusBalanceChanged,
    sethumusBalanceBetter,
    setHumusBalanceWorst,
    setHumusState
} = actions;