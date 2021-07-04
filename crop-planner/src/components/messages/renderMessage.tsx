import {useDispatch, useSelector} from "react-redux";
import {
    selectHumusBalanceBetter,
    selectHumusBalanceChanged,
    selectHumusBalanceWorst,
    selectLoading
} from "../../store/states/table/selector";
import {RenderSuccessMessage} from "./renderSuccessMessage";
import {RenderErrorMessage} from "./renderErrorMessage";
import {Snackbar} from "@material-ui/core";
import React from "react";
import {setHumusBalanceChanged} from "../../store/states/table/reducer";

type SnackbarState = {
    vertical: 'top' | 'bottom',
    horizontal: 'left' | 'center' | 'right',
}

export const RenderMessage = () => {
    const dispatch = useDispatch();

    const initialState: SnackbarState = {
        vertical: 'bottom',
        horizontal: 'center',
    };

    const [state] = React.useState(initialState);

    const handleClose = () => {
        dispatch(setHumusBalanceChanged(false));
    };

    const {vertical, horizontal} = state;
    const isLoading: boolean = useSelector(selectLoading);
    const isHumusBalanceChanged: boolean = useSelector(selectHumusBalanceChanged);
    const isHumusBalanceBetter: boolean = useSelector(selectHumusBalanceBetter);
    const isHumusBalanceWorst: boolean = useSelector(selectHumusBalanceWorst);
    let snackbarStandard = <div></div>;
    let snackbar = <div></div>;
    let message;

    const standardMessage: string = "Your humus balance was updated";
    const humusBetterMessage: string = "<strong>Your humus balance is now <i>better</i></strong>";
    const humusWorstMessage: string = "<strong>Your humus balance is now <i>worst</i></strong>";

    if (isHumusBalanceChanged && !isLoading) {
        if (isHumusBalanceBetter) {
            message = <RenderSuccessMessage message={humusBetterMessage}/>
        } else if (isHumusBalanceWorst) {
            message = <RenderErrorMessage message={humusWorstMessage}/>
        }

        snackbarStandard = (
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                open={true}
                key="standardMessage"
                autoHideDuration={6000}
                onClose={handleClose}>
                <RenderSuccessMessage message={standardMessage}/>
            </Snackbar>
        );

        if (message) {
            snackbar = (
                <Snackbar
                    anchorOrigin={{vertical, horizontal}}
                    open={true}
                    key={vertical + horizontal}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    className="secondSnackbar">
                    {message}
                </Snackbar>
            );
        }
    }

    return (
        <div>
            {snackbarStandard}
            {snackbar}
        </div>
    );
}