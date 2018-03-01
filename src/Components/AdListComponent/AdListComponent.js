import React from 'react';
import PropTypes from 'prop-types';
import { PRICE_DROP, getDiscountTag } from '../../Common/DiscountHelper';
import { adTypes } from '../../Model/adTypes';
import { getQuantity } from '../../Common/CartHelper';

import './AdListComponentStyle.css';

const getAdList = (cart, quantityHandler, discounts) => {
    return adTypes.map((adType) => {
        const discount = getDiscountTag(discounts, adType.type);
        return (
            <div className="AdListComponent__adList" key={ adType.type }>
                <div className="AdListComponent__details">
                    <div className="AdListComponent__title"> { adType.name } </div>
                    <div className="AdListComponent__description"> { adType.description } </div>
                    <div className={`AdListComponent__price ${!(discount.type === PRICE_DROP) || 'AdListComponent__priceDrop'}`}> Price: { adType.price } </div>
                    <div className="AdListComponent__discount"> { discount.tag } </div>
                </div>
                <div className="AdListComponent__addToCartContainer">
                    <input
                        className="AdListComponent__quantity"
                        min="0"
                        name="quantity"
                        onChange={(e)=> {
                            quantityHandler({
                                ...adType,
                                qty: e.target.value,
                                discount: discount
                            });
                        }}
                        type="number"
                        value={getQuantity(cart, adType)} />
                </div>
            </div>
        );
    });
};

const AdListComponent = (props) => {
    const { cart, discounts, quantityHandler } = props;
    return (
        <div className="AdListComponent__container">
            { getAdList(cart, quantityHandler, discounts) }
        </div>
    );
};

AdListComponent.propTypes = {
    quantityHandler: PropTypes.func.isRequired,
    discounts: PropTypes.array.isRequired,
    cart: PropTypes.array.isRequired
};

export default AdListComponent;
