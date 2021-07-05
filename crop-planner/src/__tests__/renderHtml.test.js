import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {RenderHTML} from "../components/helper/renderHtml";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('<RenderHTML />', () => {
    it('renders empty html', async () => {
        await act(async () => {
            render(<RenderHTML/>, container);
        });
        expect(container.innerHTML).toEqual("<span></span>");
        expect(container.textContent).toContain("");
    });

    it('renders with html', async () => {
        await act(async () => {
            render(<RenderHTML html="<strong>Your humus balance is now <i>better</i></strong>"/>, container);
        });
        expect(container.innerHTML).toEqual(<span><strong>Your humus balance is now <i>better</i></strong></span>);
        expect(container.textContent).toContain("Your humus balance is now better");
    });
})
