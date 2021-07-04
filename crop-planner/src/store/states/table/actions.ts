import {setCrops, setFields, setHumusState, setHumusStatus, setLoader, setOriginalFields} from "./reducer";
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
            dispatch(setOriginalFields(fields));
            dispatch(setHumusStatus(humusStatus));
        } catch (e) {
            console.error(e)
        }
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

export const dispatchFetchHumus = (allFields: Field[], field: Field, originalFields: Field[], humusStatus: HumusStatus[]) => {
    dispatchLoading(true);
    return async (dispatch: Dispatch) => {
        try {
            fetchHumus(field).then((updatedField: Field) => {
                const originalField = originalFields.find((field: Field) => field.id === updatedField.id);
                const stateFields = {
                    ...allFields.map((field: Field) => {
                        return field.id === updatedField.id ? updatedField : field;
                    })
                };

                if (originalField) {
                    let humusBalanceChanged: boolean = false;
                    let humusBalanceBetter: boolean = false;
                    let humusBalanceWorst: boolean = false;

                    if (originalField.humus_balance !== updatedField.humus_balance) {
                        humusBalanceChanged = true;
                        humusBalanceBetter = originalField.humus_balance < updatedField.humus_balance;
                        humusBalanceWorst = originalField.humus_balance > updatedField.humus_balance;
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