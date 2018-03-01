import React from 'react';
import { shallow } from 'enzyme';

import AdStoreComponent from './AdStoreComponent';
import AdListComponent from '../AdListComponent/AdListComponent';
import AdCartComponent from '../AdCartComponent/AdCartComponent';

describe('AdStoreComponent()', () => {
    const adStoreComponentMock = shallow(<AdStoreComponent user={{
        username: 'Unilever',
        discounts: [{
            type: 'BuyXGetYFree',
            product: 'classic',
            minPurchase: 3,
            free: 1
        }]
    }}/>);

    it('should have correct username in header', () => {
        const usernameLabelElement = adStoreComponentMock.find('.AdListComponent__user').first();
        expect(usernameLabelElement.text()).toContain('Unilever');
    });

    it('should have AdListComponent', () => {
        expect(adStoreComponentMock.find(AdListComponent).length).toBe(1);
    });

    it('should have AdCartComponent', () => {
        expect(adStoreComponentMock.find(AdCartComponent).length).toBe(1);
    });
});
