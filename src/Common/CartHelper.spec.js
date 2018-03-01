import { addQuantity, totalPriceCalculator, getQuantity } from './CartHelper';

describe('CartHelper()', () => {
    it('should get correct quantity', () => {
        const item = {
            type: 'classic'
        };
        let quantity = getQuantity([], item);
        expect(quantity).toBe(0);
        quantity = getQuantity([{
            type: 'classic',
            qty: 3
        }], item);
        expect(quantity).toBe(3);
    });
    it('should add item to cart and calculate its subtotal correctly', () => {
        const cartList = [];
        const item = {
            type: 'classic',
            name: 'Classic Ad',
            description: 'Our classic ad, simple and effective.',
            price: 269.99,
            qty: 2
        };
        const updatedCartList = addQuantity(cartList, item);
        expect(updatedCartList.length).toBe(1);
        expect(updatedCartList[0].type).toBe(item.type);
        expect(updatedCartList[0].name).toBe(item.name);
        expect(updatedCartList[0].description).toBe(item.description);
        expect(updatedCartList[0].price).toBe(item.price);
        expect(updatedCartList[0].qty).toBe(2);
        expect(updatedCartList[0].subTotal).toBe('539.98');
    });

    it('should update item quantity correctly', () => {
        const cartList = [{
            type: 'classic',
            name: 'Classic Ad',
            description: 'Our classic ad, simple and effective.',
            price: 269.99,
            qty: 2,
            subTotal: '539.98'
        }, {
            type: 'standout',
            name: 'Standout Ad',
            description: 'Add your company logo, and display longer presentation text.',
            price: 322.99,
            qty: 1,
            subTotal: '322.99'
        }];
        const item = {
            type: 'classic',
            name: 'Classic Ad',
            description: 'Our classic ad, simple and effective.',
            price: 269.99,
            qty: 4
        };
        const updatedCartList = addQuantity(cartList, item);
        expect(updatedCartList.length).toBe(2);
        expect(updatedCartList[0].qty).toBe(4);
        expect(updatedCartList[0].subTotal).toBe('1079.96');
        expect(updatedCartList[1].qty).toBe(1);
        expect(updatedCartList[1].subTotal).toBe('322.99');
    });

    it('should add discount classic ad and calculate its subtotal correctly', () => {
        const cartList = [];
        const item = {
            type: 'classic',
            name: 'Classic Ad',
            description: 'Our classic ad, simple and effective.',
            price: 269.99,
            qty: 4,
            discount: {
                type: 'BuyXGetYFree',
                product: 'classic',
                minPurchase: 3,
                free: 1
            }
        };
        const updatedCartList = addQuantity(cartList, item);
        expect(updatedCartList.length).toBe(1);
        expect(updatedCartList[0].qty).toBe(4);
        expect(updatedCartList[0].subTotal).toBe('809.97');
    });

    it('should calculate BuyXGetYFree discount correctly', () => {
        const cartList = [];
        const item = {
            type: 'classic',
            name: 'Classic Ad',
            description: 'Our classic ad, simple and effective.',
            price: 269.99,
            qty: 4,
            discount: {
                type: 'BuyXGetYFree',
                product: 'classic',
                minPurchase: 3,
                free: 1
            }
        };
        const updatedCartList = addQuantity(cartList, item);
        expect(updatedCartList.length).toBe(1);
        expect(updatedCartList[0].qty).toBe(4);
        expect(updatedCartList[0].subTotal).toBe('809.97');
    });

    it('should calculate BuyXGetXPriceDrop discount correctly', () => {
        const cartList = [];
        const item = {
            type: 'premium',
            name: 'Premium Ad',
            description: 'All the benefits of the Standout Ad, and appear at the top of the results.',
            price: 394.99,
            qty: 4,
            discount: {
                type: 'BuyXGetXPriceDrop',
                product: 'premium',
                minPurchase: 4,
                price: 379.99
            }
        };
        const updatedCartList = addQuantity(cartList, item);
        expect(updatedCartList.length).toBe(1);
        expect(updatedCartList[0].qty).toBe(4);
        expect(updatedCartList[0].subTotal).toBe('1519.96');
    });

    it('should calculate PriceDrop discount correctly', () => {
        const cartList = [];
        const item = {
            type: 'standout',
            name: 'Standout Ad',
            description: 'Add your company logo, and display longer presentation text.',
            price: 322.99,
            qty: 2,
            discount: {
                type: 'PriceDrop',
                product: 'standout',
                price: 299.99
            }
        };
        const updatedCartList = addQuantity(cartList, item);
        expect(updatedCartList.length).toBe(1);
        expect(updatedCartList[0].qty).toBe(2);
        expect(updatedCartList[0].subTotal).toBe('599.98');
    });

    it('should calculate total correctly', () => {
        const cartList = [{
            type: 'classic',
            name: 'Classic Ad',
            description: 'Our classic ad, simple and effective.',
            price: 269.99,
            qty: 4,
            subTotal: '1079.96',
        }, {
            type: 'standout',
            name: 'Standout Ad',
            description: 'Add your company logo, and display longer presentation text.',
            price: 322.99,
            qty: 2,
            subTotal: '599.98',
            discount: {
                type: 'PriceDrop',
                product: 'standout',
                price: 299.99
            }
        }];
        const totalPrice = totalPriceCalculator(cartList);
        expect(totalPrice).toBe('1679.94');
    });
});
