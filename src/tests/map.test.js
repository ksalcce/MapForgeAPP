import React from "react";
import MapGrid from "../components/maps/map-grid";
import ApiContext from "../ApiContext";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import waitForExpect from "wait-for-expect";

describe("Save test", () => {
    it("renders without crashing and tests button click", () => {
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
                <ApiContext.Provider
                    value={{
                        fix: { city: false, tree: false, water: false },
						flag: " ",
                        name: "test",
                        mapString: "tttbbbbcbtbbbbbwwwbbbwwbwbbbwwwwwwbbwwbbbbbbtbbbbbbbtttbttttttttttttttttttttttttt",
                        width: 9,
                        values: { city: "0.0", tree: "0.4", water: "0.2" },
                    }}
                >
                    <MapGrid />
                </ApiContext.Provider>
            </Router>
        );

        expect(app.find(".grid").first().exists()).toBeTruthy();

        app.find(".save").props().onClick();
        return waitForExpect(() => {
            app.update();
            expect(global.fetch).toHaveBeenCalledTimes(0);
            global.fetch.mockClear();
            app.unmount();
        });
    });
});
