/**
*
* home.js
* All Book page.
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

// ALL THE MODEL
import {BookModel} from "../../model/book";

export const AllBookPage = (props:any) => {

	// DECLARE STATE VARIABLE
	const [state, setState] = useState([]);

	// DECLARE LOCAL VARIABLE
	const history = useHistory();

	// USE EFFECT ON LOAD PROCESS
	useEffect(() => {
		// FETCH ALL BOOKS
		getAllBooks();
	}, []);

	/**
	* FUNCTION USED TO FETCH ALL THE BOOKS
	* @INPUT - NA
	* @OUTPUT - NA
	*/
	const getAllBooks = () => {
		/* CALLING GETALLFILES FUNCTION TO FETCH ALL THE BOOKS */
		API.get(Constant.URL.ALL_BOOKS).then((result:any) => {
			setState(result?.data);
		}).catch((error) => {
		  console.log(error);
		});
	};

	// RENDER HTML
	return(
		<>
			<Header selectedMenu="BOOKS" subtitle="All Books"/>	
			<div id="all-books" className="main-wrapper">
				<ul  className="book-list-container">
				{
					state.map((item, index) => {
						return (
							<li key={index} className="book-list-item-container">
								<BookItem data={item}/>
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