import React, {Component} from 'react';
import {Card, CardHeader, Grid} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Order from "./Order";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            allProducts: [],
            color: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/products?styleID=' + this.props.styleID)
            .then(async results => {
                let products = await results.json();
                let data = {};
                for (let product of products) {
                    if (!data[product.colorName]) {
                        data[product.colorName] = product;
                    }
                }
                let dataArray = [];
                Object.keys(data).forEach(key => {
                    dataArray.push({color: key, item: data[key]})
                });
                console.log(products);
                this.setState({
                    data,
                    // dataArray,
                    allProducts: products,
                    products: dataArray
                })
            })
    }

    render() {
        return (
            <div>
                {
                    this.props.color === '' ?
                        <Grid container spacing={3}>
                            {
                                this.state.products.map((product, key) => {
                                    if (product.item.colorFrontImage) {
                                        return <Grid item key={key} xs={2}>
                                            <Card onClick={() => {
                                                this.props.changeColor(product.color);
                                                this.props.customize();
                                            }}>
                                                <CardHeader
                                                    title={`${product.item.brandName} ${product.item.styleName}`}
                                                    subheader={product.color}/>
                                                <CardMedia component={'img'}
                                                           src={'https://www.ssactivewear.com/' + product.item.colorFrontImage}/>
                                            </Card>
                                        </Grid>
                                    }
                                    else if (product.item.colorSideImage){
                                        return <Grid item key={key} xs={2}>
                                            <Card onClick={() => {
                                                this.props.changeColor(product.color);
                                                this.props.customize();
                                            }}>
                                                <CardHeader
                                                    title={`${product.item.brandName} ${product.item.styleName}`}
                                                    subheader={product.color}/>
                                                <CardMedia component={'img'}
                                                           src={'https://www.ssactivewear.com/' + product.item.colorSideImage}/>
                                            </Card>
                                        </Grid>
                                    }
                                })
                            }
                        </Grid> :
                        <Order
                            products={this.state.allProducts.filter(product => product.colorName === this.props.color)}
                            otherColorProducts={this.state.products}
                            changeColor={this.props.changeColor}
                        />
                }
            </div>
        )
    }

}

export default Products;