import React from 'react';
import './Product.css';
import bag1 from '../../../images/bag/bag-1.png'
import bag2 from '../../../images/bag/bag-2.png'
import bag3 from '../../../images/bag/bag-3.png'
import Splv from '../../../images/shoe/shoe-1.png'
import Nike1 from '../../../images/shoe/shoe-2.png'
import Nike2 from '../../../images/shoe/shoe-3.png'
import Sunglasses from '../../../images/Sunglasses/Sunglasses-1.jpg'
import watch from '../../../images/watch/watch-1.jpg'
import DisplayProduct from '../DisplayProduct/DisplayProduct';


const Products = [
    {
        id:1,
        name:'Red-Bag',
        price:30,
        photo:bag1
    },
    {
        id:2,
        name:'Blue-Bag',
        price:30,
        photo:bag2
    },
    {
        id:3,
        name:'Black-Bag',
        price:'30',
        photo:bag3
    },
    {
        id:4,
        name:'Splv-350',
        price:'50',
        photo:Splv
    },
   
    {
        id:5,
        name:'Nike-Red',
        price:50,
        photo:Nike1
    },
    {
        id:6,
        name:'Nike-Gray',
        price:50,
        photo:Nike2
    },
    {
        id:7,
        name:'Sunglass',
        price:35,
        photo:Sunglasses
    },
    {
        id:8,
        name:'Watch',
        price:25,
        photo:watch
    },
]


const Product = () => {
    return (
        <section className="container">
            <div className=" card-deck mt-5 pt-5">
            {
                Products.map(product => 
                <DisplayProduct 
                product={product} 
                key={product.id}>
                </DisplayProduct>)
            }
            </div>
        </section>
    );
};

export default Product;