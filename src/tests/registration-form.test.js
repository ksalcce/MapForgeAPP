import React from "react";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import ApiContext from "../ApiContext";
import { act } from "@testing-library/react";
import waitForExpect from "wait-for-expect";

describe("Reg Form test", () => {
    it("renders without crashing and tests submission of form", () => {
        const mockUser = {
            full_name: "Greg Magle",
            nick_name: "Bagel",
            user_name: "maglegrey",
            password: "passphras3?",
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
                <RegistrationForm />
            </Router>
        );

        expect(app.find(".RegistrationForm").first().exists()).toBeTruthy();

        app.find("form").simulate("submit", {
            target: {
                full_name: mockUser.full_name,
                nick_name: mockUser.nick_name,
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
