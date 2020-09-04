/**
*
* bookDetails.js
* Book details page
*
* @author - Faizal
* @date   - 2 September 2020
*
***/
// REACT NATIVE IMPORT
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

// ALL SERVICES
import * as API from '../../service/api';

// ALL COMPONENT
import { BookItem } from '../../component/bookItem';
import { Header } from '../layout/header';
import { Footer } from '../layout/footer';

// ALL SHARED FILES
import * as Constant from '../../helper/constant';
import * as Session from '../../helper/session';
import * as Utils from '../../helper/utils';

// ALL THE MODEL
import {BookModel} from "../../model/book";

export const BookDetailsPage = (props:any) => {

	// DECLARE LOCAL VARIABLE
	const { match: { params } } = props;

	// DECLARE STATE VARIABLE
	const [state, setState] = useState<BookModel | undefined>();
	// DECLARE LOCAL VARIABLE
	const history = useHistory();

	// DECLARE LOCAL VARIABLE
	useEffect(() => {
		// FETCH BOOK DETAILS
		getBookDetails(params.bookId);
	}, []);

	/**
	* FUNCTION USED TO GET BOOK DETAILS
	* @INPUT - NA
	* @OUTPUT - NA
	*/
	const getBookDetails = (bookId: number) => {
		/* CALLING GETALLFILES FUNCTION TO FETCH BOOK DETAILS */
		API.get(Constant.URL.BOOK_DETAILS).then((result: any) => {
			// FILTER THE SELECTED BOOK AND GET DETAILS
			let bookSelected = result?.data.filter((item:any) => {
				return item?.bookId == bookId;
			})
			// SAVING THE SELECTED BOOK DETAILS INTO THE STATE
			setState(bookSelected.length>0 ? bookSelected[0] : {});
		}).catch((error) => {
		  console.log(error);
		});
	};

	/**
	* FUNCTION USED TO BUY ITEM
	* @INPUT - OBJECT
	* @OUTPUT - NA
	*/
	const buyItem = (bookItem:any) => {
		let data: string | null = Session.getSession(Constant.STORAGE.CART_LIST);
		let formattedData = (data) ? JSON.parse(data) : [];
		formattedData.push({...bookItem, orderPlaced: Utils.getToday(), orderId: Utils.generateId(bookItem.bookId)});
		Session.setSession(Constant.STORAGE.CART_LIST, JSON.stringify(formattedData));
		history.push('/cart');
	};

	/**
	* FUNCTION USED TO ADD TO THE CART
	* @INPUT - OBJECT
	* @OUTPUT - NA
	*/
	const addToCart = (bookItem:any) => {
		let data = Session.getSession(Constant.STORAGE.CART_LIST);
		let formattedData = (data) ? JSON.parse(data) : [];
		formattedData.push({...bookItem, orderPlaced: Utils.getToday(), orderId: Utils.generateId(bookItem.bookId)});
		Session.setSession(Constant.STORAGE.CART_LIST, JSON.stringify(formattedData));
		alert("Added successfully.");
	};

	// RENDER HTML
	return(
		<>
			<Header selectedMenu="DETAILS" subtitle={state?.title}/>
			<div id="book-details" className="main-wrapper">
				<div className="row table-type1-header">
					<div className="flex1 img-container">
						<img src={state?.img} className="img-cover"/>	
					</div>
					<div className="flex1">
						<p className="title">{state?.title}</p>
						<p className="cost content-line"><b>Book Price:</b> $ {state?.cost}</p>
						<p className="author content-line"><b>Author Name:</b> {state?.authorName}</p>
						<p className="pagecount content-line"><b>Page count:</b> {state?.pageCount}</p>
						<p className="isbn content-line"><b>ISBN:</b> {state?.ISBN}</p>
						<div className="btn-container">
							<button onClick={() => addToCart(state)}>Add to cart</button>
							<button onClick={() => buyItem(state)}>Buy Now</button>
						</div>
						<p className="desc">{state?.desc}</p>
					</div>
				</div>
			</div>
			<Footer/>
		</>
	)
}