import {Field, HumusStatus} from "../../types";
import {sortBy} from "lodash";
import {RenderCropCell} from "./renderCropCell";
import {useSelector} from "react-redux";
import {selectHumusSatus} from "../../store/states/table/selector";

export const RenderFieldRow = ({field}: { field: Field }) => {
    const humusStatus: HumusStatus | undefined = useSelector(selectHumusSatus).find((humusStatus: HumusStatus) => humusStatus.fieldId === field.id);

    return (
        <div className="table__row" key={`table__cell-${field.id}`}>
            <div className="table__cell" key={`table__cell-name${field.id}`}>{field.name}</div>
            <div className="table__cell table__cell--right" key={`table__cell-area-${field.id}`}>{field.area}</div>

            {sortBy(field.crops, crop => crop.year).map(seasonalCrop => {
                return <RenderCropCell field={field} seasonalCrop={seasonalCrop} key={`table__cell-RenderCropCell-${seasonalCrop.year}`}/>
            })}

            <div
                className={`
                    table__cell
                    table__cell--right
                    ${humusStatus?.better ? 'humusBetter' : ''}
                    ${humusStatus?.worst ? 'humusWorst' : ''}
                `}
                key={`table__cell-humus-balance-${field.id}`}
            >
                {field.humus_balance}
            </div>
        </div>
    )
}