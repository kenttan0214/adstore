import React from 'react';
import { shallow } from 'enzyme';

import AdCartComponent from './AdCartComponent';

describe('AdCartComponent()', () => {
    const getAdCartComponent = (cart = []) => {
        return shallow(
            <AdCartComponent
                cart={cart}
            />);
    };

    it('should not render ordered items and show empty cart message', () => {
        const adCartComponent = getAdCartComponent();
        const cartElement = adCartComponent.find('.AdCartComponent__orderedItem');
        const emptyCartElement = adCartComponent.find('.AdCartComponent__emptyCart');
        expect(cartElement.length).toBe(0);
        expect(emptyCartElement.text().trim()).toBe('There are no items in this cart.');
    });

    it('should render 2 ordered items and have correct total values', () => {
        const cart = [{
            type: 'classic',
            name: 'Classic Ad',
            description: 'Our classic ad, simple and effective.',
            price: 269.99,
            qty: 1,
            subTotal: 269.99
        }, {
            type: 'standout',
            name: 'Standout Ad',
            description: 'Add your company logo, and display longer presentation text.',
            price: 322.99,
            qty: 2,
            subTotal: 645.98
        }];

        const adCartComponent = getAdCartComponent(cart);
        const cartElement = adCartComponent.find('.AdCartComponent__orderedItem');
        const totalValueElement = adCartComponent.find('.AdCartComponent__totalValue');
        expect(cartElement.length).toBe(2);
        expect(Number(totalValueElement.text())).toBe(915.97);
    });
});
