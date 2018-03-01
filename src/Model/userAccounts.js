export const userAccounts = [
    {
        username: 'Unilever',
        discounts: [
            {
                type: 'BuyXGetYFree',
                product: 'classic',
                minPurchase: 3,
                free: 1
            }
        ]
    }, {
        username: 'Apple',
        discounts: [
            {
                type: 'PriceDrop',
                product: 'standout',
                price: 299.99
            }
        ]
    }, {
        username: 'Nike',
        discounts: [
            {
                type: 'BuyXGetXPriceDrop',
                product: 'premium',
                minPurchase: 4,
                price: 379.99
            }
        ]
    }, {
        username: 'Ford',
        discounts: [
            {
                type: 'BuyXGetYFree',
                product: 'classic',
                minPurchase: 5,
                free: 1
            }, {
                type: 'PriceDrop',
                product: 'standout',
                price: 309.99
            }, {
                type: 'BuyXGetXPriceDrop',
                product: 'premium',
                minPurchase: 3,
                price: 389.99
            }
        ]
    }
];
