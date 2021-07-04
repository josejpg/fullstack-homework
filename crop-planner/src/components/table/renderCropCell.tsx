import {Crop, Field, HumusStatus, SeasonalCrop} from "../../types";
import {useSelector} from "react-redux";
import {selectAllCrops, selectFields, selectHumusSatus, selectLoading} from "../../store/states/table/selector";
import CropSelect from "../../CropSelect";
import buildNewFieldsState from "../../buildNewFieldsState";
import {store} from "../../store";
import {dispatchFetchHumus} from "../../store/states/table/actions";

export const RenderCropCell = ({field, seasonalCrop}: { field: Field, seasonalCrop: SeasonalCrop }) => {
    const allCrops: Crop[] = useSelector(selectAllCrops);
    const fields: Field[] = useSelector(selectFields);
    const humusStatus: HumusStatus[] = useSelector(selectHumusSatus);
    const isLoading: boolean = useSelector(selectLoading);
    return (
        <div className="table__cell table__cell--center table__cell--with-select" key={`year_${seasonalCrop.year}`}>
            <CropSelect
                key={`table__cell-field-${field.id}-crop-${seasonalCrop.year}`}
                selectedCrop={seasonalCrop.crop}
                allCrops={allCrops}
                onChange={(newCrop: Crop | null) => changeFieldCrop(
                    newCrop,
                    field.id,
                    seasonalCrop.year,
                    fields,
                    humusStatus,
                    isLoading
                )}
            />
        </div>
    )
}

const changeFieldCrop = (
    newCrop: Crop | null,
    fieldId: number,
    cropYear: number,
    fields: Field[],
    humusStatus: HumusStatus[],
    isLoading: boolean
) => {
    const {allFields, prevFields} = buildNewFieldsState(fields, newCrop, fieldId, cropYear);
    const field = allFields.find(field => field.id === fieldId) as Field;
    if (!isLoading) {
        store.dispatch(dispatchFetchHumus(allFields, field, prevFields, humusStatus));
    }
}