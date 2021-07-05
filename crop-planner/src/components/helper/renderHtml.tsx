export const RenderHTML = ({html}: { html?: string }) => {
    let tag = <span />;
    if (html) {
        tag = <span dangerouslySetInnerHTML={{__html: html}} />
    }
    return tag
}