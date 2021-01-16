import React from "react";

export default React.createContext({
    width: 0,
    height: 0,
    mapString: "",
    values: {},
    fix: {},
    flag: "",
    changeWidth: () => {},
    changeHeight: () => {},
    changeString: () => {},
    changeSlider: () => {},
    changeFix: () => {},
    changeFlag: () => {},
    clickAccountLink: () => {},
});
