import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import LoginComponent from './LoginComponent';

describe('LoginComponent()', () => {
    it('should renders LoginComponent', () => {
        shallow(<LoginComponent handleLogin={() => {}}/>);
    });

    it('should update userName when text input change', () => {
        const mockUsername = 'Testing';
        const handleUserNameInputSpy = sinon.spy(LoginComponent.prototype, 'handleUserNameInput');
        const loginComponentMock = shallow(<LoginComponent handleLogin={() => {}}/>);

        const usernameElement = loginComponentMock.find('.LoginComponent__usernameTextInput').first();
        usernameElement.value = mockUsername;
        usernameElement.simulate('change', { target: { value: usernameElement.value }});

        expect(handleUserNameInputSpy.calledOnce).toBe(true);
        expect(loginComponentMock.state('userName')).toBe(mockUsername);
        handleUserNameInputSpy.restore();
    });

    it('should able to submit login form', () => {
        const handleLoginSubmitSpy = sinon.spy(LoginComponent.prototype, 'handleLoginSubmit');
        const loginComponentMock = shallow(<LoginComponent handleLogin={() => {}} />);

        const formElement = loginComponentMock.find('.LoginComponent__form').first();
        formElement.simulate('submit', { preventDefault: () => {} });

        expect(handleLoginSubmitSpy.calledOnce).toBe(true);
        handleLoginSubmitSpy.restore();
    });

    it('should able to trigger login handler', () => {
        const handleLoginSpy = sinon.spy();
        const loginComponentMock = shallow(<LoginComponent handleLogin={handleLoginSpy} />);
        loginComponentMock.setState({ userName: 'Testing' });

        const submitElement = loginComponentMock.find('.LoginComponent__form').first();
        submitElement.simulate('submit', { preventDefault: () => {} });

        expect(handleLoginSpy.calledOnce).toBe(true);
    });
});
