/**
*
* footer.js
* Footer of the page
*
* @author - Faizal
* @date   - 2 September 2020
*
***/
// REACT NATIVE IMPORT
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';


export const Footer = (props: any) => {

	// DECLARE STATE VARIABLE
	const [state, setState] = useState([]);


	// RENDER HTML
	return(
		<>	
			<div className="footer">
				Copyrights 2020 iwaymen.com All rights reserved.
			</div>
		</>
	)
}