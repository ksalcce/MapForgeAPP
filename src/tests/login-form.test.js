import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import ApiContext from "../ApiContext";
import { act } from "@testing-library/react";
import waitForExpect from "wait-for-expect";

describe("login Form test", () => {
    it("renders without crashing and tests submission of form", () => {
        const mockUser = {
            user_name: "naglegrey",
            password: "Passw0rd!",
        };
        const mockJsonPromise = Promise.resolve(mockUser); // 2
        const mockFetchPromise = Promise.resolve({
            // 3
            json: () => mockJsonPromise,
            ok: true,
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockLoginUser = jest.fn();

        const app = mount(
            <Router>
                <LoginForm />
            </Router>
        );

        expect(app.find(".LoginForm").first().exists()).toBeTruthy();

        app.find("form").simulate("submit", {
            target: {
                user_name: mockUser.user_name,
                password: mockUser.password,
            },
        });
        return waitForExpect(() => {
            app.update();
            expect(global.fetch).toHaveBeenCalledTimes(1);
            global.fetch.mockClear();
            app.unmount();
        });
    });
});
