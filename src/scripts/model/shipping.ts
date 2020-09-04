/**
*
* shipping.js
* Handle All shipping model
*
* @author - Faizal
* @date   - 2 September 2020
*
***/
export interface ShippingModel {
    fullName: string;
    address: string;
    cityState: string;
    country: string;
    zipcode: string;
}

export enum SHIPPING_INITIAL {
	fullName = '',
	address = '',
	cityState = '',
	country = '',
	zipcode = ''
}