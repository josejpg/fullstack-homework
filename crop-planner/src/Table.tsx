import {PureComponent} from 'react'
import {sortBy} from 'lodash'

import CropSelect from './CropSelect'
import {Crop, Field, SeasonalCrop} from './types'
import {fetchCrops, fetchFields, fetchHumus} from './api'
import buildNewFieldsState from './buildNewFieldsState'

type Props = {}

type State = {
    allCrops: Array<Crop>,
    fields: Array<Field>
}

export default class Table extends PureComponent<Props, State> {

    loading: boolean = false;

    constructor(props: Props) {
        super(props);

        this.state = {
            allCrops: [],
            fields: [],
        }
    }

    componentDidMount = async () =>
        this.setState({
            fields: await fetchFields(),
            allCrops: await fetchCrops(),
        })

    render = () =>
        <div className="table">
            <div className="table__row table__row--header">
                <div className="table__cell">Field name</div>
                <div className="table__cell table__cell--right">Field area (ha)</div>
                <div className="table__cell table__cell--center">2020 crop</div>
                <div className="table__cell table__cell--center">2021 crop</div>
                <div className="table__cell table__cell--center">2022 crop</div>
                <div className="table__cell table__cell--center">2023 crop</div>
                <div className="table__cell table__cell--center">2024 crop</div>
                <div className="table__cell table__cell--right">Humus balance</div>
            </div>

            {sortBy(this.state.fields, field => field.name).map(field => this.renderFieldRow(field))}
        </div>

    renderFieldRow = (field: Field) =>
        <div className="table__row" key={field.id}>
            <div className="table__cell" key="name">{field.name}</div>
            <div className="table__cell table__cell--right" key="area">{field.area}</div>

            {sortBy(field.crops, crop => crop.year).map(seasonalCrop => this.renderCropCell(field, seasonalCrop))}

            <div className="table__cell table__cell--right" key="hummus_balance">{field.humus_balance}</div>
        </div>

    renderCropCell = (field: Field, seasonalCrop: SeasonalCrop) =>
        <div className="table__cell table__cell--center table__cell--with-select" key={`year-${seasonalCrop.year}`}>
            <CropSelect
                selectedCrop={seasonalCrop.crop}
                allCrops={this.state.allCrops}
                onChange={newCrop => this.changeFieldCrop(newCrop, field.id, seasonalCrop.year)}
            />
        </div>

    changeFieldCrop = (newCrop: Crop | null, fieldId: number, cropYear: number) => {
        this.loading = true;

        const allFields = buildNewFieldsState(this.state.fields, newCrop, fieldId, cropYear).fields;
        const field = allFields.find(field => field.id === fieldId) as Field;

        fetchHumus(field).then((updatedField: Field) => {
            this.setState({
                fields: {
                    ...allFields.map((field:Field) => {
                        return field.id === updatedField.id ? updatedField : field;
                    })
                }
            });
            this.loading = false;
        });
    }
}
