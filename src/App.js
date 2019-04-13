import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import MainSection from './layout/MainSection';

class App extends Component {
    render() {
        return (
            <div className="App">
                <MainSection />
            </div>
        )
    }
}

const AppwithRedux = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default AppwithRedux;