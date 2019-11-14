import React, {Component} from 'react';
import {Card, Grid, CardHeader} from '@material-ui/core';
import CardMedia from "@material-ui/core/CardMedia";
import Products from "./Products";

class SSActiveWear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            styleID: 0
        }
    }

    componentDidMount() {
        let categories = this.props.data.filter(row => row.baseCategory === this.props.baseCategory);
        // fetch('http://localhost:3001/styles?baseCategory=' + this.props.baseCategory)
        //     .then(async results => {
        //         let categories = await results.json();
        //         console.log(categories);
        //         this.setState({
        //             categories
        //         })
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        this.setState({
            categories
        })
    }

    render() {
        return (
            <div>
                {
                    this.props.styleID === 0 ?
                        <Grid container spacing={3}>
                            {
                                this.state.categories.map((category, key) => (
                                    <Grid item key={key} xs={2}>
                                        <Card onClick={() => this.props.setStyle(category.styleID, `${category.brandName} ${category.styleName}`)}>
                                            <CardHeader title={`${category.brandName} ${category.styleName}`}/>
                                            <CardMedia component={'img'}
                                                       src={'https://www.ssactivewear.com/' + category.styleImage}/>
                                        </Card>
                                    </Grid>
                                ))
                            }
                        </Grid> : <Products styleID={this.props.styleID} color={this.props.color} changeColor={this.props.changeColor} customize={this.props.customize}/>

                }
            </div>
        )
    }
}

export default SSActiveWear;