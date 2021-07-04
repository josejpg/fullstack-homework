import {Crop, Field} from './types'
import {filter, find} from 'lodash'
import {dispatchSavePrevFields} from "./store/states/table/actions";

// Here we emulate a reducer
const buildNewFieldsState = (prevFields: Array<Field>, newCrop: Crop | null, fieldId: number, cropYear: number) => {
    dispatchSavePrevFields(prevFields);
    const oldField = find(prevFields, field => field.id === fieldId)!
    const allFields: Field[] = [
        ...filter(prevFields, field => field.id !== fieldId),
        {
            ...oldField,
            crops: [
                ...filter(oldField.crops, crop => crop.year !== cropYear),
                {year: cropYear, crop: newCrop},
            ],
        },
    ];

    return {
        allFields,
        prevFields
    }
}

export default buildNewFieldsState
