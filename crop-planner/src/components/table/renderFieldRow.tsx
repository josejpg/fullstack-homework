import {Field} from "../../types";
import {sortBy} from "lodash";
import {RenderCropCell} from "./renderCropCell";

export const RenderFieldRow = ({field}: { field: Field }) =>
    <div className="table__row" key={field.id}>
        <div className="table__cell" key={`name_${field.id}`}>{field.name}</div>
        <div className="table__cell table__cell--right" key={`area_{field.id}`}>{field.area}</div>

        {sortBy(field.crops, crop => crop.year).map(seasonalCrop => {
            return <RenderCropCell field={field} seasonalCrop={seasonalCrop} />
        })}

        <div className="table__cell table__cell--right" key={`humusBalance_{field.id}`}>{field.humus_balance}</div>
    </div>