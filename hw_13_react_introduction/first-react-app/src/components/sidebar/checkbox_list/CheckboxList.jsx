import React from "react";

import './CheckboxList.css'

export class CheckboxList extends React.Component {
    render() {
        return <div className="side-panel-category side-panel-category-wrap1">
            <h5 className="side-panel-category__title">Морская рыба</h5>
            <div className="side-panel-category__content">
                <div>
                    <input id="fish1" name="fish1" type="checkbox"/>
                        <label htmlFor="fish1">Акула</label>
                </div>
                <div>
                    <input id="fish2" name="fish2" type="checkbox"/>
                        <label htmlFor="fish2">Окунь</label></div>
                <div>
                    <input id="fish3" name="fish3" type="checkbox"/>
                        <label htmlFor="fish3">Палтус</label></div>
                <div>
                    <input id="fish4" name="fish4" type="checkbox"/>
                        <label htmlFor="fish4">Треска</label>
                </div>
            </div>
        </div>
    }
}