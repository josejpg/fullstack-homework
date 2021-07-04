import {useSelector} from "react-redux";
import {selectFields, selectLoading} from "../../store/states/table/selector";
import {sortBy} from "lodash";
import {RenderFieldRow} from "./renderFieldRow";

export const RenderTable = () => {
    const fields = useSelector(selectFields);
    const isLoading: boolean = useSelector(selectLoading);
    let table;

    if (isLoading) {
        table = (
            <div className="table" key="emptyTable">
            </div>
        );
    } else {
        table = (
            <div className="table" key="table">
                <div className="table__row table__row--header" key="table__row--header">
                    <div className="table__cell" key="table__row--header-name">Field name</div>
                    <div className="table__cell table__cell--right" key="table__row--header-area">Field area (ha)</div>
                    <div className="table__cell table__cell--center" key="table__row--header-2020-crop">2020 crop</div>
                    <div className="table__cell table__cell--center" key="table__row--header-2021-crop">2021 crop</div>
                    <div className="table__cell table__cell--center" key="table__row--header-2022-crop">2022 crop</div>
                    <div className="table__cell table__cell--center" key="table__row--header-2023-crop">2023 crop</div>
                    <div className="table__cell table__cell--center" key="table__row--header-2024-crop">2024 crop</div>
                    <div className="table__cell table__cell--right" key="table__row--header-humus-balance">Humus balance</div>
                </div>

                {sortBy(fields, field => field.name).map(field => {
                    return <RenderFieldRow field={field} key={`renderFieldRow_${field.id}`}/>
                })}
            </div>
        )
    }

    return table;
}