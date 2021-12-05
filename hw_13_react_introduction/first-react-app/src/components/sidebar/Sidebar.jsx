import React from "react";
import {CheckboxList} from "./checkbox_list/CheckboxList";

import './Sidebar.css'

export class Sidebar extends React.Component {
    render(){
        return <aside className="side-panel side-panel_dark">
            <CheckboxList/>
            <CheckboxList/>
        </aside>
    }
}