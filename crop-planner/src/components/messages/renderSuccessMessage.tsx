import Alert from "@material-ui/lab/Alert";
import {RenderHTML} from "../helper/renderHtml";

export const RenderSuccessMessage = ({message}: { message: string }) =>
    <Alert severity="success">
        <RenderHTML html={message}/>
    </Alert>