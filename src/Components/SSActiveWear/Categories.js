import React, {Component} from 'react';
import {Card, CardHeader, Grid, Breadcrumbs, Link} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import SSActiveWear from "./SSActiveWear";

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            data: [],
            baseCategory: '',
            styleID: 0,
            color: '',
            breadcrumbs: ['S&S Active Wear'],
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/categories')
            .then(async results => {
                let data = await results.json();
                console.log(data);
                let categories = data.uniqueStyles;
                data = data.data;
                this.setState({
                    categories,
                    data
                })
            })
    }

    goToCategory = (baseCategory) =>{
        let breadcrumbs = this.state.breadcrumbs;
        breadcrumbs.push(baseCategory);
        this.setState({
            baseCategory,
            breadcrumbs
        })
    };

    goToItem = (item) => {
        let breadcrumbs = this.state.breadcrumbs;
        breadcrumbs.push(item);
        this.setState({
            breadcrumbs
        })
    };

    customize = () => {
        let breadcrumbs = this.state.breadcrumbs;
        breadcrumbs.push('Customize');
        this.setState({
            breadcrumbs
        })
    };

    changeBreadCrumb = key => {
        switch(key){
            case 0: {
                let breadcrumbsState = this.state.breadcrumbs;
                let breadcrumbs = breadcrumbsState;
                while(breadcrumbs.length > 1){
                    breadcrumbs.pop();
                }
                this.setState({
                    breadcrumbs,
                    styleID: 0,
                    color: '',
                    baseCategory: ''
                });
                break;
            }
            case 1: {
                let breadcrumbsState = this.state.breadcrumbs;
                let breadcrumbs = breadcrumbsState;
                // for(let i = 0; i < breadcrumbs.length - 2; i++){
                //     breadcrumbs.pop();
                // }
                while(breadcrumbs.length > 2){
                    breadcrumbs.pop();
                }
                this.setState({
                    breadcrumbs,
                    color: '',
                    styleID: 0
                });
                break;
            }
            case 2: {
                let breadcrumbsState = this.state.breadcrumbs;
                let breadcrumbs = breadcrumbsState;
                for(let i = 0; i < breadcrumbs.length - 3; i++){
                    breadcrumbs.pop();
                }
                this.setState({
                    breadcrumbs,
                    color: ''
                });
                break;
            }
                default: return null
        }
    };


    setStyle = (styleID, breadCrumb) => {
        this.goToItem(breadCrumb);
        this.setState({
            styleID
        })
    };

    changeColor = color => {
        this.setState({
            color
        })
    };

    render() {
        return (
            <div>
                <Breadcrumbs component={'div'}>
                    {
                        this.state.breadcrumbs.map((breadcrumb, key) => (
                            <Link component={'div'} key={key} onClick={()=>this.changeBreadCrumb(key)}>{breadcrumb}</Link>
                        ))
                    }
                </Breadcrumbs>
                {
                    this.state.baseCategory === '' ? <Grid container spacing={3}>
                        {
                            this.state.categories.map((category, key) => (
                                <Grid item key={key} xs={2}>
                                    <Card onClick={()=>this.goToCategory(category)}>
                                        <CardHeader title={`${category}`}/>
                                        {/*<CardMedia component={'img'}*/}
                                        {/*           src={'https://www.ssactivewear.com/' + category.image}/>*/}
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid> : <SSActiveWear data={this.state.data}
                                            goToItem={this.goToItem}
                                            color={this.state.color}
                                            changeColor={this.changeColor}
                                            styleID={this.state.styleID}
                                            setStyle={this.setStyle}
                                            baseCategory={this.state.baseCategory}
                                            customize={this.customize}
                    />

                }
            </div>
        )
    }

}

export default Categories;