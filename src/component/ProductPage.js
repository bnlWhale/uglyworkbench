import React, { Component } from 'react';
import axios from 'axios';
import { Button, Glyphicon, Table, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../index.css';


const ProductRow = (props) => {
    function onDeleteClick() {
        props.deleteProduct(props.product.id);

    }

    return (
        <tr>
            <td><Link to={'/issues/${props.product.id}'}>{props.product.id.substr(-4)}</Link></td>
            <td>{props.product.firstName}</td>
            <td>{props.product.lastName}</td>
            <td>{props.product.age}</td>
            <td>
                <Button bsSize="xsmall" onClick={onDeleteClick}><Glyphicon glyph="shopping-cart" /></Button>
            </td>
        </tr>
    );
};

ProductRow.propTypes = {
    product: PropTypes.object.isRequired,
    deleteProduct: PropTypes.func.isRequired,
};


function ProductTable(props) {
    console.log(props)
    const productRow = props.products.map((val, idx)=> {
       let product = props.products[idx];
        return (
            <ProductRow key={idx} product={product} deleteProduct={props.deleteProduct} />
        )})


    return (
        <Table bordered condensed hover responsive>
            <thead>
            <tr>
                <th> ID </th>
                <th>first name</th>
                <th>last name</th>
                <th>age</th>
                <th>delete</th>
                <th></th>
            </tr>
            </thead>
            <tbody>{productRow}</tbody>
        </Table>
    );
}

ProductTable.propTypes = {
    products: PropTypes.array.isRequired,
    deleteProduct: PropTypes.func.isRequired,
};


class ProductPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = { products: [] };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("onClick")

    }

    componentDidMount() {
        console.log("ProductPage componentDidMount")
        axios.get('/getAll')
            .then(res => {
                console.log(res.data);
                this.setState({products:res.data});
            });
    }

    deleteProduct(id) {
        console.log("delete product:",id)
        /*fetch(`/api/issues/${id}`, { method: 'DELETE' }).then(response => {
            if (!response.ok) alert('Failed to delete issue');
            else this.loadData();
        });*/
    }

    render(){
        return(
            <div>
                <h2> Product List</h2>
                <ProductTable products={this.state.products} deleteProduct={this.deleteProduct} />

            </div>

        )
    }

}


export default ProductPage