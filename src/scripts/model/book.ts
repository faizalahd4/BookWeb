/**
*
* book.js
* Handle All book model
*
* @author - Faizal
* @date   - 2 September 2020
*
***/
export interface BookModel {
    bookId: string;
    title: string;
    desc: string;
    cost: string;
    authorName: string;
    pageCount?: number;
    ISBN?: string;
    img?: string;
    orderPlaced?: string;
    status?: string;
    orderId?: number;
}
