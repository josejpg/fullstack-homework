import Alert from "@material-ui/lab/Alert";
import {RenderHTML} from "../helper/renderHtml";

export const RenderErrorMessage = ({message}: { message: string }) =>
    <Alert severity="error">
        <RenderHTML html={message}/>
    </Alert>