import React from 'react';
import { shallow } from 'enzyme';

import AppComponent from './AppComponent';

import LoginComponent from '../LoginComponent/LoginComponent';
import AdStoreComponent from '../AdStoreComponent/AdStoreComponent';

describe('AppComponent()', () => {
    it('should renders AppComponent', () => {
        shallow(<AppComponent />);
    });

    it('should only show login component before loggedIn', () => {
        const AppComponentMock = shallow(<AppComponent />);

        expect(AppComponentMock.find(AdStoreComponent).length).toBe(0);
        expect(AppComponentMock.find(LoginComponent).length).toBe(1);
    });

    it('should only show AdStoreComponent component after loggedIn', () => {
        const AppComponentMock = shallow(<AppComponent />);

        AppComponentMock.setState({
            user: {
                username: 'test',
                discounts: [],
                isLoggedIn: true
            }
        });

        expect(AppComponentMock.find(LoginComponent).length).toBe(0);
        expect(AppComponentMock.find(AdStoreComponent).length).toBe(1);
    });
});
