import React from 'react';
import PropTypes from 'prop-types';
import { totalPriceCalculator } from '../../Common/CartHelper';
import './AdCartComponentStyle.css';

const AdCartComponent = (props) => {
    const { cart } = props;
    const haveItem = cart.length > 0;

    const orderedList = () => {
        return cart.map((item) => {
            if (item.qty > 0) {
                return (
                    <div className="AdCartComponent__orderedItem" key={item.name}>
                        <div className="AdCartComponent__itemType">{ item.name }</div>
                        <div className="AdCartComponent__itemQuantity"><span>x</span> { item.qty }</div>
                        <div className="AdCartComponent__itemPrice"> { item.subTotal } </div>
                    </div>
                );
            } else {
                return '';
            }
        });
    };

    return (<div className="AdCartComponent__container">
        <div className="AdCartComponent__title">Order Summary</div>
        { haveItem ? orderedList() : '' }

        { !haveItem ? <div className="AdCartComponent__emptyCart">There are no items in this cart.</div> : ''}

        {haveItem ? <div className="AdCartComponent__total">
            <div className="AdCartComponent__totalLabel">Total</div>
            <div className="AdCartComponent__totalValue">{ totalPriceCalculator(cart) }</div>
        </div> : ''}
    </div>);
};

AdCartComponent.propTypes = {
    cart: PropTypes.array.isRequired
};

export default AdCartComponent;
