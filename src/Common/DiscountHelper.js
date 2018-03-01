import React from 'react';
export const BUY_X_GET_Y_FREE = 'BuyXGetYFree';
export const BUY_X_GET_X_PRICE_DROP = 'BuyXGetXPriceDrop';
export const PRICE_DROP = 'PriceDrop';

export const getDiscountTag = (discounts, adType) => {
    const haveDiscount = discounts.find((discount) => discount.product === adType);

    if (haveDiscount) {
        const discountDetails = {
            ...haveDiscount
        };
        switch (haveDiscount.type) {
        case BUY_X_GET_Y_FREE:
            discountDetails.tag = <span>Buy { haveDiscount.minPurchase } get { haveDiscount.free } free</span>;
            break;
        case BUY_X_GET_X_PRICE_DROP:
            discountDetails.tag = <span>Price drop to { haveDiscount.price } when you buy more than { haveDiscount.minPurchase } ads</span>;
            break;
        case PRICE_DROP:
            discountDetails.tag = <span>Special offer price: { haveDiscount.price } </span>;
            break;
        default:
            return {};
        }
        return discountDetails;
    }
    return {};
};

export const getDiscountPrice = (item) => {
    const {discount, price, qty} = item;
    let discountPrice = 0;

    if (!discount) return discountPrice;

    const {type} = discount;

    switch (type) {
    case BUY_X_GET_Y_FREE:
        discountPrice = buyXGetYFreeDiscount(price, qty, discount);
        break;
    case BUY_X_GET_X_PRICE_DROP:
        discountPrice = buyXGetXPriceDrop(price, qty, discount);
        break;
    case PRICE_DROP:
        discountPrice = priceDrop(price, qty, discount);
        break;
    default:
        return discountPrice;
    }
    return discountPrice;
};

const buyXGetYFreeDiscount = (oriPrice, qty, discount) => {
    const { free, minPurchase } = discount;
    const freeItems = Math.floor(qty / minPurchase);
    const discountPrice = freeItems * free * oriPrice;
    return discountPrice;
};

const buyXGetXPriceDrop = (oriPrice, qty, discount) => {
    const { minPurchase, price } = discount;
    const discountPrice = (qty >= minPurchase) ? qty * Math.abs(oriPrice - price) : 0;
    return discountPrice;
};

const priceDrop = (oriPrice, qty, discount) => {
    const { price } = discount;
    const discountPrice = qty * Math.abs(oriPrice - price);
    return discountPrice;
};
