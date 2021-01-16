import React, { Component } from "react";
import { Route } from "react-router-dom";
// import config from "../config";
import "./App.css";
import Header from "../Header/Header";
import LoginPage from "../../routes/LoginPage/LoginPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";
import AccountPage from "../../routes/AccountPage/AccountPage";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import PrivateRoute from "../Utils/PrivateRoute";
import Landing from "../landing/landing";
import Maps from "../maps/map-landing";
import ApiContext from "../../ApiContext";

import { growRiver, shrinkTrees, growCity } from "./helpers/slider-functions";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            width: 9,
            height: 9,
            mapString: "b".repeat(81),
            values: { water: 0.5, tree: 0.5, city: 0.5 },
            fix: { water: false, tree: false, city: false },
            flag: " ",
        };
    }

    componentDidMount() {
        // grab data here as necessary
    }

    // The main branches of the app
    renderMainRoutes() {
        return (
            <>
                <Route exact path="/" component={Landing} />
                <Route path="/maps" component={Maps} />
                <PublicOnlyRoute path={"/login"} component={LoginPage} />
                <PublicOnlyRoute
                    path={"/register"}
                    component={RegistrationPage}
                />
                <PrivateRoute path={"/account"} component={AccountPage} />
            </>
        );
    }

    handleChangeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    };

    // the handles, to be passed to the context
    handleChangeString = (mapString) => {
        // setting the sliders to have the proper fractional values
        const waterPercentage = (
            mapString.split("").filter((i) => i === "w").length /
            mapString.length
        ).toFixed(1);
        const treePercentage = (
            mapString.split("").filter((i) => i === "t").length /
            mapString.length
        ).toFixed(1);
        const cityPercentage = (
            mapString.split("").filter((i) => i === "c").length /
            mapString.length
        ).toFixed(1);

        this.setState((prevstate) => {
            return {
                mapString,
                values: {
                    water: waterPercentage,
                    tree: treePercentage,
                    city: cityPercentage,
                },
            };
        });
    };

    handleChangeWidth = (e) => {
        const width = Number(e.target.value) <= 0 ? 1 : Number(e.target.value);
        this.setState((prevstate) => ({
            width,
            mapString: "b".repeat(prevstate.height * width),
        }));
    };

    handleChangeHeight = (e) => {
        const height = Number(e.target.value) <= 0 ? 1 : Number(e.target.value);
        this.setState((prevstate) => ({
            height,
            mapString: "b".repeat(prevstate.width * height),
        }));
    };

    handleChangeSlider = (e) => {
        const name = e.target.id;
        const sliderValue = e.target.value;
        let mapString;

        if (name === "water") {
            mapString = growRiver(
                this.state.height,
                this.state.width,
                this.state.mapString.split(""),
                sliderValue
            );
        } else if (name === "tree") {
            mapString = shrinkTrees(
                this.state.height,
                this.state.width,
                this.state.mapString.split(""),
                sliderValue
            );
        } else {
            mapString = growCity(
                this.state.height,
                this.state.width,
                this.state.mapString.split(""),
                sliderValue
            );
        }

        if (!this.state.fix[name]) {
            this.setState((prevstate) => {
                return {
                    mapString,
                    values: { ...prevstate.values, [name]: sliderValue },
                };
            });
        }
    };

    handleChangeFix = (e) => {
        let name = e.target.id;
        let value = e.target.checked;

        this.setState((prevstate) => {
            return {
                fix: { ...prevstate.fix, [name]: value },
            };
        });
    };

    resetState = () => {
        this.setState({
            name: "",
            width: 9,
            height: 9,
            mapString: "b".repeat(81),
            values: { water: 0.5, tree: 0.5, city: 0.5 },
            fix: { water: false, tree: false, city: false },
            flag: " ",
        });
    };

    handleChangeFlag = (e) => {
        this.setState((prevstate) => {
            return prevstate.flag !== "  " ? { flag: "  " } : { flag: " " };
        });
        this.resetState();
    };

    handleAccountLinkClick = (mapVals) => {
		const name = mapVals.map_name
		const { width } = mapVals;
        const mapString = mapVals.map_string;
        const height = mapString.length / width;
        this.setState({ name, width, height, mapString });
    };

    render() {
        const value = {
            name: this.state.name,
            width: this.state.width,
            height: this.state.height,
            mapString: this.state.mapString,
            values: this.state.values,
            fix: this.state.fix,
            flag: this.state.flag,
            changeName: this.handleChangeName,
            changeWidth: this.handleChangeWidth,
            changeHeight: this.handleChangeHeight,
            changeString: this.handleChangeString,
            changeSlider: this.handleChangeSlider,
            changeFix: this.handleChangeFix,
            changeFlag: this.handleChangeFlag,
            clickAccountLink: this.handleAccountLinkClick,
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="jumbotron">
                    <nav className="App_nav"></nav>
                    <header className="App_header">
                        {this.state.flag}
                        <Header />
                    </header>
                    <main className="App_main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
