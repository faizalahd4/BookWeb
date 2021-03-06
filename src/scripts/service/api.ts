/**
*
* api.js
* Handle API Service
*
* @author - Faizal
* @date   - 25 August 2020
*
***/
// REACT NATIVE IMPORT
import React from 'react';


/**
* Get API
*
* @input  String URL
* @return NA
*/
export const get = (URL: any) => {
	return new Promise((resolve: any, reject: any) => {
		// FETCH REQUEST
		fetch(URL, {
			headers: {
				'Cache-Control': 'no-cache',
				'Content-Type': 'application/json',
        		'Accept': 'application/json'
			}
		})
		.then((response) => response.json())
		.then((data) => {
			// SAVE THE PROMISE RESOLVE
			resolve(data);
		}).catch((error) => {
			reject(error);
		});
	});	
};