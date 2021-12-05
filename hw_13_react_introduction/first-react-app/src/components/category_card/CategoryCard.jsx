import React from 'react'

import './CategoryCard.css'

export class CategoryCard extends React.Component {

    render() {
        return  <article className="category-card category-card-wrap1">
            <div className="category-card__content">
                <a className="category-card__title" href="#category">{this.props.title}</a>
                <h4 className="category-card__description">{this.props.description}</h4>
            </div>
        </article>
    }
}