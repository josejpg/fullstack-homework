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
            <div className="table">
            </div>
        );
    } else {
        table = (
            <div className="table" key="table">
                <div className="table__row table__row--header" key="table__row--header">
                    <div className="table__cell" key="fieldNameHeader">Field name</div>
                    <div className="table__cell table__cell--right" key="fieldAreaHeader">Field area (ha)</div>
                    <div className="table__cell table__cell--center" key="crop2020Header">2020 crop</div>
                    <div className="table__cell table__cell--center" key="crop2021Header">2021 crop</div>
                    <div className="table__cell table__cell--center" key="crop2022Header">2022 crop</div>
                    <div className="table__cell table__cell--center" key="crop2023Header">2023 crop</div>
                    <div className="table__cell table__cell--center" key="crop2024Header">2024 crop</div>
                    <div className="table__cell table__cell--right" key="humusBalanceHeader">Humus balance</div>
                </div>

                {sortBy(fields, field => field.name).map(field => {
                    return <RenderFieldRow field={field}/>
                })}
            </div>
        )
    }

    return table;
}