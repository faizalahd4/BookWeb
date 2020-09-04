/**
*
* bookItem.js
* Book Item component.
*
* @author - Faizal
* @date   - 2 September 2020
*
***/
// REACT NATIVE IMPORT
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

// ALL SHARED FILES
import * as Constant from '../helper/constant';
import * as Session from '../helper/session';
import * as Utils from '../helper/utils';

// ALL THE MODEL
import {BookModel} from "../model/book";

export const BookItem = (props:any) => {

	// DECLARE STATE VARIABLE
	const [state, setState] = useState({});
	// DECLARE LOCAL VARIABLE
	const history = useHistory();

	/**
	* FUNCTION USED TO BUY ITEM
	* @INPUT - NA
	* @OUTPUT - NA
	*/
	const buyItem = (bookItem:any | null) => {
		// FETCH SAVED DATA FROM STORAGE
		let data: string | null = Session.getSession(Constant.STORAGE.CART_LIST);
		// CHECKING WHETHER ITS EMPTY OR NOT
		let formattedData = (data) ? JSON.parse(data) : [];
		// ADDING THE NEW BUY INTO THE CART LIST
		formattedData.push({...bookItem, orderPlaced: Utils.getToday(), orderId: Utils.generateId(bookItem.bookId)});
		// SAVING IN THE STORAGE
		Session.setSession(Constant.STORAGE.CART_LIST, JSON.stringify(formattedData));
		// NAVIGATING TO CART PAGE
		history.push('/cart');
	};

	/**
	* FUNCTION USED TO NAVIGATE BOOK DETAILS PAGE
	* @INPUT - Object
	* @OUTPUT - NA
	*/
	const bookDetails = (data:BookModel | null) => {
		// NAVIGATING TO BOOK DETAILS PAGE
		history.push('/bookDetails/' + data?.bookId);
	}

	// RENDER HTML
	return(
		<div className="book-container">
			<div onClick={() => bookDetails(props.data)}>
				<img src={props.data.img}/>	
				<p className="title">{props.data.title}</p>
				<p className="author">{props.data.authorName}</p>
				<p className="cost">$ {props.data.cost}</p>
			</div>
			<button onClick={() => buyItem(props.data)}>Buy Now</button>
		</div>
	)
}