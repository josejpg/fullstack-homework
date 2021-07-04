import {PureComponent} from 'react'
import {Provider} from "react-redux";
import {store} from "./store";

import './stylesheets/index.scss'

import Table from './components/table/Table'
import Messages from "./components/messages/Messages";

class App extends PureComponent {
    render = () =>
        <Provider store={store}>
            <div className="app">
                <Table/>
                <Messages/>
            </div>
        </Provider>
}

export default App
