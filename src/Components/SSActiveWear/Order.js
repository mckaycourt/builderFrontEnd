import React, {Component} from 'react';
import {Card, CardHeader, Grid} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Builder from "../Builder";

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            largeImage: ''
        }
    }


    componentDidMount() {
        let image = 'https://www.ssactivewear.com/';
        if(this.props.products[0].colorFrontImage){
            image += this.props.products[0].colorFrontImage;
        }
        else if(this.props.products[0].colorSideImage){
            image += this.props.products[0].colorSideImage;
        }
        let largeImage = image.replace('fm', 'fl');
        this.setState({
            largeImage
        })
    }

    changeColor = (event, product) => {
        event.preventDefault();
        this.setState({
            largeImage: ''
        }, () => {
            let image = 'https://www.ssactivewear.com/';
            if (product.item.colorFrontImage) {
                console.log('front image');
                image += product.item.colorFrontImage;
            }
            else if(product.item.colorSideImage){
                console.log('side image');
                image += product.item.colorSideImage;
            }
            let largeImage = image.replace('fm', 'fl');
            this.setState({
                largeImage
            })
        });
    };

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item>
                        {
                            this.state.largeImage !== '' && <Builder image={this.state.largeImage}/>
                        }
                    </Grid>
                    <Grid item>
                        <Grid container spacing={2}>
                            {
                                this.props.products.map((product, key) => {
                                        if (product.colorFrontImage || product.colorSideImage) {
                                            return <Grid item key={key} xs={4}>
                                                <Card>
                                                    <CardHeader title={product.sizeName}
                                                                subheader={'$' + product.customerPrice.toFixed(2)}/>
                                                </Card>
                                            </Grid>
                                        }
                                    }
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <div>
                    <Grid container>
                        <Grid item xs={3}>
                            <Grid container>
                                {
                                    this.props.otherColorProducts.map((product, key) => {
                                            if (product.item.color1) {
                                                return <Grid item key={key} xs={2}>
                                                    {/*<Card>*/}
                                                    {/*    <CardHeader title={`${product.color}`}/>*/}
                                                    {/*</Card>*/}
                                                    <input type={'color'} value={product.item.color1}
                                                        // onMouseOver={event => this.changeColor(event, product)}
                                                        // onMouseOut={event => this.changeColor()}
                                                           onClick={event => this.changeColor(event, product)}/>
                                                </Grid>
                                            }
                                        }
                                    )
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default Order;