import config from "../config";
import TokenService from "./token-service";

const AccountService = {
    getMaps() {
        return fetch(`${config.API_ENDPOINT}/maps`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${TokenService.getAuthToken()}`,
            },
            // body: JSON.stringify(TokenService.getAuthToken()),
        }).then((data) => {
            if (!data.ok) return data.json().then((e) => Promise.reject(e));
            return data.json();
        });
    },
    deleteMap(map_name) {
		return fetch(`${config.API_ENDPOINT}/maps`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({ map_name }),
        }).then((data) => {
            if (!data.ok) return data.json().then((e) => Promise.reject(e));
            return data.json();
        });
    },
};

export default AccountService;
