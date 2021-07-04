import {PureComponent} from 'react'
import {State} from "../../store/states/table/state";
import {RenderTable} from "./renderTable";
import {dispatchLoading} from "../../store/states/table/actions";

type Props = {}

export default class Table extends PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount = async () => {
        dispatchLoading(true);
    }

    render = () => <RenderTable/>

}