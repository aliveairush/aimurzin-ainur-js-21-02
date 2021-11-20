import React from 'react'

import './ProductCard.css'

export class ProductCard extends React.Component {

    render() {
        return <article id="prod-1" className="product product-wrap1 product_dark">
            <div className="product__image"><img alt=""
                                                 src={this.props.img}/>
            </div>
            <div className="product__content product_dark">
                <a href="#product"><h4 className="product__title">{this.props.title}</h4></a>
                <button className="product__btn">Купить</button>
            </div>
        </article>
    }
}