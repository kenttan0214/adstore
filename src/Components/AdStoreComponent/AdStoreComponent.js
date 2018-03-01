import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdListComponent from '../AdListComponent/AdListComponent';
import AdCartComponent from '../AdCartComponent/AdCartComponent';
import { addQuantity } from '../../Common/CartHelper';

import './AdStoreComponentStyle.css';

class AdStoreComponent extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    }

    constructor (props) {
        super(props);

        this.state = {
            cart: []
        };

        this.quantityHandler = this.quantityHandler.bind(this);
    }

    quantityHandler (item) {
        const cart = addQuantity(this.state.cart, item);
        this.setState({ cart });
    }

    render () {
        const {
            user
        } = this.props;

        const {
            cart
        } = this.state;

        return (
            <div className="AdListComponent__container">
                <header className="AdListComponent__header">
                    <span className="AdListComponent__brand">AdStore</span>
                    <span className="AdListComponent__user">Logged in as <strong>{user.username}</strong> &ndash; <a className="AdListComponent__logout" href="/" >Log out</a></span>
                </header>

                <div className="AdListComponent__content">
                    <div className="AdListComponent__list">
                        <AdListComponent cart={cart} discounts={ user.discounts } quantityHandler={this.quantityHandler} />
                    </div>

                    <div className="AdListComponent__cart">
                        <AdCartComponent cart={cart} />
                    </div>
                </div>
            </div>
        );
    }
}

export default AdStoreComponent;
