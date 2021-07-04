import {setCrops, setFields, setHumusState, setHumusStatus, setLoader, setPrevFields} from "./reducer";
import {Crop, Field, HumusStatus} from "../../../types";
import {Dispatch} from "redux";
import {fetchCrops, fetchFields, fetchHumus} from "../../../api";

export const dispatchFetchFields = () => {
    return async (dispatch: Dispatch) => {
        try {
            const fields = await fetchFields();
            const humusStatus: HumusStatus[] = fields.map((field: Field) => {
                return {
                    fieldId: field.id,
                    better: false,
                    worst: false
                };
            })
            dispatch(setFields(fields));
            dispatch(setPrevFields(fields));
            dispatch(setHumusStatus(humusStatus));
        } catch (e) {
            console.error(e)
        }
    }
}

export const dispatchSavePrevFields = (payload: Field[]) => {
    return async (dispatch: Dispatch) => {
        dispatch(setPrevFields(payload));
    }
}

export const dispatchFetchCrops = () => {
    return async (dispatch: Dispatch) => {
        try {
            const crops: Crop[] = await fetchCrops();
            dispatch(setCrops(crops));
        } catch (e) {
            console.error(e)
        }
    }
}

export const dispatchLoading = (payload: boolean) => {
    return async (dispatch: Dispatch) => {
        dispatch(setLoader(payload));
    }
}

export const dispatchFetchHumus = (allFields: Field[], field: Field, prevFields: Field[], humusStatus: HumusStatus[]) => {
    dispatchLoading(true);
    return async (dispatch: Dispatch) => {
        try {
            fetchHumus(field).then((updatedField: Field) => {
                const prevField = prevFields.find((field: Field) => field.id === updatedField.id);
                const stateFields = [
                    ...allFields.map((field: Field) => {
                        return field.id === updatedField.id ? updatedField : field;
                    })
                ];

                if (prevField) {
                    let humusBalanceChanged: boolean = false;
                    let humusBalanceBetter: boolean = false;
                    let humusBalanceWorst: boolean = false;

                    if (prevField.humus_balance !== updatedField.humus_balance) {
                        humusBalanceChanged = true;
                        humusBalanceBetter = prevField.humus_balance < updatedField.humus_balance;
                        humusBalanceWorst = prevField.humus_balance > updatedField.humus_balance;
                    }

                    humusStatus = humusStatus.map((humusStatus: HumusStatus) => {
                        if (humusStatus.fieldId === updatedField.id) {
                            const newHumusStauts: HumusStatus = {
                                fieldId: humusStatus.fieldId,
                                better: humusBalanceBetter,
                                worst: humusBalanceWorst
                            }
                            return newHumusStauts;
                        }

                        return humusStatus;
                    })

                    dispatch(setHumusState({
                        humusStatus,
                        humusBalanceChanged,
                        humusBalanceBetter,
                        humusBalanceWorst
                    }));
                }

                dispatch(setFields(stateFields));
                dispatchLoading(true);
            });
        } catch (e) {
            console.error(e)
        }
    }
}