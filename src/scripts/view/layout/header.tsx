/**
*
* header.js
* Header of the page
*
* @author - Faizal
* @date   - 2 September 2020
*
***/
// REACT NATIVE IMPORT
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

// ALL SHARED FILES
import * as Constant from '../../helper/constant';

export const Header = (props: any) => {

	// DECLARE STATE VARIABLE
	const [state, setState] = useState([]);
	const [showMenu, setShowMenu] = useState(false);

	// DECLARE LOCAL VARIABLE
	const history = useHistory();

	/**
	* FUNCTION USED TO NAVIGATE
	* @INPUT - PATH
	* @OUTPUT - NA
	*/
	const navigate = (path: any) => {
		history.push(path);
	}

	/**
	* FUNCTION USED TO TOGGLE TOP MENU
	* @INPUT - NA
	* @OUTPUT - NA
	*/
	const toggleMenuMobile = () => {
		setShowMenu(!showMenu);
	}

	// RENDER HTML
	return(
		<>	
			<div className="header">
			  <i className="icon-reorder menu-icon" onClick={() => toggleMenuMobile()}></i><a href="#default" className="logo" onClick={() => navigate('/')}>Book Site / <span className="subtitle">{props.subtitle}</span></a>
			  <div className={["header-right", showMenu ? 'd-show' : 'd-none'].join(" ")}>
			    <a className={props.selectedMenu === 'BOOKS' ? "active" : ""} href="#home" onClick={() => navigate('/')}>Home</a>
			    <a className={props.selectedMenu === 'MY_ORDER' ? "active" : ""} href="#myorder" onClick={() => navigate('/myOrder')}>My Order</a>
			    <a className={props.selectedMenu === 'CART' ? "active" : ""} href="#cart" onClick={() => navigate('/cart')}>Cart</a>
			  </div>
			</div>
		</>
	)
}