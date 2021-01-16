import React from "react";
import ApiContext from "../../ApiContext";

export default class Grid extends React.Component {
    static contextType = ApiContext;
    state = {};

    replaceAt = (id, newVal) => {
        let mapArr = this.context.mapString.split("");
        mapArr[id] = newVal;
        return mapArr.join("");
    };

    handleClick = (e) => {
        let newClass;
        let newMap;
        switch (e.target.className.split(" ")[1]) {
            case "blank":
                newClass = "water";
                newMap = this.replaceAt(e.target.id, "w");
                break;
            case "water":
                newClass = "tree";
                newMap = this.replaceAt(e.target.id, "t");
                break;
            case "tree":
                newClass = "city";
                newMap = this.replaceAt(e.target.id, "c");
                break;
            case "city":
                newClass = "blank";
                newMap = this.replaceAt(e.target.id, "b");
                break;
            default:
                break;
        }
        e.target.className = `cell ${newClass}`;
        this.context.changeString(newMap);
    };

    render() {
        // function to generate each individual cell
        const cells = (substring, rowId) => {
            let s = [];
            for (const [index, value] of [...substring].entries()) {
                let fill;
                switch (value) {
                    case "b":
                        fill = "blank";
                        break;
                    case "w":
                        fill = "water";
                        break;
                    case "t":
                        fill = "tree";
                        break;
                    case "c":
                        fill = "city";
                        break;
                    default:
                        break;
                }
                s.push(
                    <div
                        id={rowId * this.context.width + index}
                        key={index}
                        className={`cell ${fill}`}
                        onClick={this.handleClick}
                    ></div>
                );

                if ((index + 1) % this.props.width === 0) {
                    s.push(<br key={`${index}br`} />);
                }
            }
            return s;
        };

        // function to break out cells into rows
        const rows = (mapString, width) => {
            let r = [];
            const reg = new RegExp(`.{1,${width}}`, "g");
            const superString = mapString.match(reg);
            for (const [index, value] of superString.entries()) {
                r.push(
                    <div key={index} className="row">
                        {cells(value, index)}
                    </div>
                );
            }
            return r;
        };

        return (
            <div id="container">
                {rows(this.props.mapString, this.props.width)}
            </div>
        );
    }
}
