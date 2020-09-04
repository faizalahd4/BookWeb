/**
*
* App.js
* Starting of the app
*
* @author - Faizal
* @date   - 2 September 2020
*
***/
// REACT NATIVE IMPORT
import React, {useReducer, useContext, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// ALL PAGE FILES
import {AllBookPage} from './scripts/view/pages/allBook';
import {BookDetailsPage} from './scripts/view/pages/bookDetails';
import {CartPage} from './scripts/view/pages/cart';
import {MyOrderPage} from './scripts/view/pages/myOrder';

function App() {

  // RENDER HTML
  return (
    <>
    <div className="App">
      <Router basename={'/'}>
        <Route path="/" exact component={AllBookPage}/>
        <Route path="/bookDetails/:bookId" exact component={BookDetailsPage}/>
        <Route path="/cart" exact component={CartPage}/>
        <Route path="/myOrder" exact component={MyOrderPage}/>
      </Router>
    </div>
    </>
  );
}

export default App;
