/**
*
* payment.js
* Handle All payment model
*
* @author - Faizal
* @date   - 2 September 2020
*
***/
export interface PaymentModel {
    itemPrice: number;
    tax: number;
    shippingCharge: number;
    total: number;
    taxPer: number;
}

export enum PAYMENT_INITIAL {
	itemPrice = 0,
	tax = 0,
	shippingCharge = 0,
	total = 0,
	taxPer = 12.5
}