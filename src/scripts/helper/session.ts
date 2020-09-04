/**
*
* sessio.js
* Handle Storage
*
* @author - Faizal
* @date   - 2 September 2020
*
***/
// REACT NATIVE IMPORT
import React from 'react';

/**
* Set session API
*
* @input  String Key
* @input  String Value
* @return NA
*/
export const setSession = (key: string, value: any) => {
	localStorage.setItem(key, value);
};

/**
* Get session API
*
* @input  String Key
* @return String
*/
export const getSession = (key:string) => {
	return localStorage.getItem(key);
};


/**
* Clear all session
*
* @input  NA
* @return NA
*/
export const clearAllSession = () => {
	localStorage.clear();
};