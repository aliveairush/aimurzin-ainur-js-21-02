import React from "react";
import {CategoryCard} from "../../components/category_card/CategoryCard";
import {ProductCard} from "../../components/product_card/ProductCard";

import './Products.css'

import {products, categories} from "../../api_mock/apiResponse";

export class Products extends React.Component {
    render() {
        return <main className="page-content">
            <header className="page-content-header">
                <h1 className="page-content-header__title">Рыба на любой вкус</h1>
                <h4 className="page-content-header__subtitle">Мы продаем рыбу, а не только показываем</h4>
            </header>
            <section className="products">
                <div className="grid-fr-2 grid-gap-10">
                    {categories.map((elem, index) => <CategoryCard title={elem.title} description={elem.description} key={index} />)}
                </div>
            </section>
            <section className="products">
                <header className="products__section-header products__section-header_dark">
                    <h1>Популярные</h1>
                </header>
                <div className="grid-fr-3 grid-gap-10">
                    {products.map((elem, index) => <ProductCard title={elem.title} img={elem.img} key={index}/>)}
                </div>
            </section>

        </main>
    }
}