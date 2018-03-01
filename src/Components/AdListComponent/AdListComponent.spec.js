import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import AdListComponent from './AdListComponent';

describe('AdListComponent()', () => {
    const mockQuantityHandler = sinon.spy();
    const adListComponentMock = shallow(
        <AdListComponent
            cart={[]}
            discounts={[{
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
            }]}
            quantityHandler={mockQuantityHandler}
        />);

    it('should render 3 types of ads', () => {
        const adListElement = adListComponentMock.find('.AdListComponent__adList');
        expect(adListElement.length).toBe(3);
    });

    it('should render discount message', () => {
        const classicDiscountTag = shallow(<div>
            {adListComponentMock.find('.AdListComponent__discount').get(0)}
        </div>);
        const standoutDiscountTag = shallow(<div>
            {adListComponentMock.find('.AdListComponent__discount').get(1)}
        </div>);
        const premiumDiscountTag = shallow(<div>
            {adListComponentMock.find('.AdListComponent__discount').get(2)}
        </div>);

        const priceDropTag = adListComponentMock.find('.AdListComponent__priceDrop');

        expect(classicDiscountTag.text().trim()).toBe('Buy 5 get 1 free');
        expect(standoutDiscountTag.text().trim()).toBe('Special offer price: 309.99');
        expect(premiumDiscountTag.text().trim()).toBe('Price drop to 389.99 when you buy more than 3 ads');
        expect(priceDropTag.length).toBe(1);
    });

    it('should have correct quantity value', () => {
        const quantityTextElement = shallow(adListComponentMock.find('.AdListComponent__quantity').get(0));
        expect(quantityTextElement.props().value).toBe(0);
    });

    it('should call quantity handler when quantity value change', () => {
        const quantityTextElement = shallow(adListComponentMock.find('.AdListComponent__quantity').get(0));

        quantityTextElement.simulate('change', { target: { value: 1 }});

        expect(mockQuantityHandler.calledOnce).toBe(true);
    });
});
