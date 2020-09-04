/**
*
* cart.js
* Cart details page
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
import { Header } from '../layout/header';
import { Footer } from '../layout/footer';

// ALL SHARED FILES
import * as Constant from '../../helper/constant';
import * as Session from '../../helper/session';

// ALL THE MODEL
import {BookModel} from "../../model/book";
import {PAYMENT_INITIAL, PaymentModel} from "../../model/payment";
import {SHIPPING_INITIAL, ShippingModel} from "../../model/shipping";

export const CartPage = (props:any) => {

	// DECLARE STATE VARIABLE
	const [cart, setCart]         = useState<BookModel[]>([]);
	const [shipping, setShipping] = useState<ShippingModel>(SHIPPING_INITIAL);
	const [payment, setPayment]   = useState<PaymentModel>(PAYMENT_INITIAL);

	// DECLARE LOCAL VARIABLE
	const history = useHistory();

	// USE EFFECT ON LOAD PROCESS
	useEffect(() => {
		// FETCH MY CART LIST
		getMyCart();
	}, []);

	/**
	* FUNCTION USED TO FETCH MY CART LIST
	* @INPUT - NA
	* @OUTPUT - NA
	*/
	const getMyCart = () => {
		/* CALLING GETALLFILES FUNCTION TO FETCH ALL MY ORDER */
		let data: string | null = Session.getSession(Constant.STORAGE.CART_LIST);
		// CHECKING WHETHER ITS EMPTY OR NOT
		let formattedData = (data) ? JSON.parse(data) : [];
		// SAVING IN THE STATE
		setCart(formattedData);
		// CALCULATING THE PAYMENT
		paymentInfo(formattedData);
	};

	/**
	* FUNCTION USED TO BUY ITEM
	* @INPUT - Order Id
	* @OUTPUT - NA
	*/
	const removeItem = (orderId: number) => {
		// FETCH SAVED DATA FROM STORAGE
		let data: string | null = Session.getSession(Constant.STORAGE.CART_LIST);
		// CHECKING WHETHER ITS EMPTY OR NOT
		let formattedData = (data) ? JSON.parse(data) : [];
		// FILTER AND REMOVING THE SELECTED BOOK FROM THE CART LIST
		formattedData = formattedData.filter((item: BookModel) => {
			return item.orderId != orderId;
		});
		// SAVING IN THE STORAGE
		Session.setSession(Constant.STORAGE.CART_LIST, JSON.stringify(formattedData));
		// SAVING IN THE STATE
		setCart(formattedData);
		// CALCULATING THE PAYMENT
		paymentInfo(formattedData);
	};

	/**
	* FUNCTION USED TO CALCULATE
	* @INPUT - Object of Array
	* @OUTPUT - NA
	*/
	const paymentInfo = (data: BookModel[]) => {
		// LOCAL VARIABLE DECALRE
		let itemprice: number = 0;
		let shippingCharge: number = data.length * 5;
		// CALCULATING ALL ITEM PRICE IN THE CART LIST
		data.forEach((item: BookModel, index: number) => {
			itemprice += parseInt(item.cost);
		});
		// CALCULATING THE TAX BY 12.5%
		let tax: number = (itemprice/100)*payment.taxPer;
		// UPDATING THE STATE
		setPayment({...payment, itemPrice: itemprice, tax: tax, shippingCharge: shippingCharge, total: itemprice + shippingCharge + tax});
	};

	/**
	* FUNCTION USED TO NAVIGATE TO HOME PAGE
	* @INPUT - NA
	* @OUTPUT - NA
	*/
	const backToHome = () => {
		history.push('/');
	};


	// RENDER HTML
	return(
		<>
			<Header selectedMenu="CART" subtitle="Cart"/>
			<div id="cart" className="main-wrapper">
				<div className="row d-block">
					<div className="flex1">
						<p className="title">Shipping Address</p>
						<input type="text" placeholder="Enter Full Name"/>
						<input type="text" placeholder="Enter Address"/>
						<input type="text" placeholder="Enter City / State"/>
						<input type="text" placeholder="Enter Country"/>
						<input type="text" placeholder="Enter Zipcode"/>
						<button>Save Address</button>
						<button>Edit Address</button>
					</div>
					<div className="flex1">
						<p className="title">Shopping Bag</p>
						<div className={[cart.length === 0 ? '' : 'd-none', "empty-container"].join(" ")}>
							<p>Your cart is empty.</p>
							<button onClick={() => backToHome()}>Continue Shopping</button>
						</div>
						<ul className={["cart-list-container"].join(" ")}>
						{
							cart.map((item: any, index: number) => {
								return (
									<li key={index} className="cart-list-item-container">
										<div className="row table-type1-header">
											<div className="flex1"><b>Order Placed:</b> {item.orderPlaced}</div>
											<div className="flex1 text-right"><i className="icon-remove" title="Remove the item" onClick={() => removeItem(item.orderId)}></i></div>
										</div>
										<div className="row table-type1-content">
											<div className="table-type1-img">
												<img src={item.img}/>		
											</div>
											<div className="flex1 table-type1-subcontent">
												<p className="title">{item.title}</p>
												<p className="author"><b>Author Name:</b> {item.authorName}</p>
												<p className="cost"><b>Book Price:</b> {item.cost}</p>
											</div>
										</div>
									</li>
								)
							})
						}
						</ul>
						<p className="title">Payment Info</p>
						<div className="row table-type2-row">
							<div className="flex1">Item Price</div>
							<div className="flex1 text-right">${payment.itemPrice}</div>
						</div>
						<div className="row table-type2-row">
							<div className="flex1">Tax</div>
							<div className="flex1 text-right">${payment.tax}</div>
						</div>
						<div className="row table-type2-row">
							<div className="flex1">Shipping Charge</div>
							<div className="flex1 text-right">${payment.shippingCharge}</div>
						</div>
						<div className="row table-type2-row total">
							<div className="flex1">Total</div>
							<div className="flex1 text-right">${payment.total}</div>
						</div>
						<div className="text-right">
							<button>Checkout</button>
							<button onClick={() => backToHome()}>Cancel</button>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</>
	)
}