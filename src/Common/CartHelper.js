import { getDiscountPrice } from './DiscountHelper';

export const addQuantity = (cartList, item) => {
    let itemFound = false;

    item.subTotal = subTotalCalculator(item);

    const updatedCartList = cartList.map((cartItem) => {
        if (cartItem.type === item.type) {
            cartItem.qty = Number(item.qty);
            cartItem.subTotal = item.subTotal;
            itemFound = true;
        }
        return cartItem;
    }).filter((cartItem) => {
        return cartItem.qty > 0;
    });

    if (!itemFound) {
        cartList.push(item);
    } else {
        return updatedCartList;
    }

    return cartList;
};

export const getQuantity = (cartList = [], item) => {
    const haveQuantity = cartList.find((cart) => cart.type === item.type);
    return haveQuantity ? haveQuantity.qty : 0;
};

export const subTotalCalculator = (item) => {
    const { price, qty} = item;
    const discountPrice = getDiscountPrice(item);
    const subTotal = (price * qty) - discountPrice;
    return subTotal.toFixed(2);
};

export const totalPriceCalculator = (items) => {
    let total = 0;
    for (const item of items) {
        const { subTotal } = item;
        total += Number(subTotal);
    }
    return total.toFixed(2);
};
