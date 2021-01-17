import React from "react";
import Header from "../components/Header/Header";
import { mount } from 'enzyme'
import { BrowserRouter as Router } from "react-router-dom";

describe("Landing Page test", () => {
    it("renders landing page text without crashing", () => {
        const app = mount(
            <Router>
                <Header />
            </Router>
        );
        expect(app.find('.top-link-list').first().exists).toBeTruthy();
        expect(app.find('.top-link').length).toBe(2);
        app.unmount()
    });
});