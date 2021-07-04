export const RenderHTML = ({html}: { html?: string }) => {
    let tag = <span></span>;
    if (html) {
        tag = <span dangerouslySetInnerHTML={{__html: html}}></span>
    }
    return tag
}