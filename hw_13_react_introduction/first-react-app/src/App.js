import React from "react";
import './App.css';
import {Header} from "./components/header/Header";
import {Sidebar} from "./components/sidebar/Sidebar";
import {Footer} from "./components/footer/Footer";
import {Products} from "./forms/products/Products";

class App extends React.Component {
    render() {
        return (
            <div className="App container index-page-layout">
                <div className="page-layout-header">
                    <Header/>
                </div>
                <div className="page-layout-side-panel">
                    <Sidebar/>
                </div>
                <div className="page-layout-page-content">
                    <Products/>
                </div>
                <div className="page-layout-footer">
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default App;
