/**
*
* myOrder.js
* MyOrder  details page
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

export const MyOrderPage = (props:any) => {

	// DECLARE STATE VARIABLE
	const [state, setState] = useState([]);

	// DECLARE LOCAL VARIABLE
	const history = useHistory();

	// USE EFFECT ON LOAD PROCESS
	useEffect(() => {
		// FETCH ALL ORDER
		getAllOrder();
	}, []);

	/**
	* FUNCTION USED TO FETCH ALL THE ORDER
	* @INPUT - NA
	* @OUTPUT - NA
	*/
	const getAllOrder = () => {
		/* CALLING GETALLFILES FUNCTION TO FETCH ALL MY ORDER */
		API.get(Constant.URL.MY_ORDER).then((result: any) => {
			setState(result.data);
		}).catch((error) => {
		  console.log(error);
		});
	};

	// RENDER HTML
	return(
		<>
			<Header selectedMenu="MY_ORDER" subtitle="My Order"/>
			<div id="myorder" className="main-wrapper">
				<ul className="myorder-list-container">
				{
					state.map((item: any, index: number) => {
						return (
							<li key={index} className="myorder-list-item-container">
								<div className="row table-type1-header">
									<div className="flex1"><b>Order Placed:</b> {item.orderPlaced}</div>
									<div className="flex1 text-right"><b>Status:</b> {item.status}</div>
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
			</div>
			<Footer/>
		</>
	)
}