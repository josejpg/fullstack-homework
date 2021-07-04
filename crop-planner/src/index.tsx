import ReactDOM from 'react-dom'

import App from './App'
import {store} from "./store";
import {dispatchFetchCrops, dispatchFetchFields} from "./store/states/table/actions";
import {setLoader} from "./store/states/table/reducer";

//Dispatch the fetchs before our root component renders
store.dispatch(dispatchFetchCrops());
store.dispatch(dispatchFetchFields());
store.dispatch(setLoader(false));

ReactDOM.render(<App />, document.getElementById('root'))
