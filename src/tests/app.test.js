import React from "react";
import App from "../components/app/App";
import { mount } from 'enzyme'
import { BrowserRouter as Router } from "react-router-dom";

describe("App test", () => {
    it("renders without crashing", () => {
        const mockJsonPromise = Promise.resolve([]); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
            ok: true
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);


        const app = mount(
            <Router>
                <App />
            </Router>
        );
        expect(app.find('.App_nav').first().exists()).toBeTruthy();
        expect(app.find('.App_header').first().exists()).toBeTruthy();
        app.unmount()
    });
});
