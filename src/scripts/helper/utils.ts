/**
*
* utils.js
* Handle All basic utils method
*
* @author - Faizal
* @date   - 2 September 2020
*
***/
// REACT NATIVE IMPORT
import React from 'react';
import * as Constant from './constant';
import * as Session from './session';

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
"October", "November", "December"];

/**
* Generate unique id
*
* @input  String apeend id
* @return String
*/
export const generateId = (targetId = '') => {
	return Math.floor((Math.random() * 1000000000) + 1) + targetId;
};

/**
* Get today
*
* @input  NA
* @return String
*/
export const getToday = () => {
	let now = new Date();
	let day   = now.getDate();
	let month = months[now.getMonth()];
	let year  = now.getFullYear();
	return day + " " + month + ", " + year;
};
