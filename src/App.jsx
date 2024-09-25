import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Board from './components/Board';
import Header from './components/Header';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
        <Header/>
          <Routes>
            <Route path="/" element={<Navigate to="/boards" />} />
            <Route path="/boards" element={<Board />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
