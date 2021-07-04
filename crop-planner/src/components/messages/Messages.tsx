import {PureComponent} from 'react'
import {State} from "../../store/states/table/state";
import {RenderMessage} from "./renderMessage";

type Props = {}

export default class Messages extends PureComponent<Props, State> {

    componentDidMount = async () => {
    }

    render = () => <RenderMessage />
}