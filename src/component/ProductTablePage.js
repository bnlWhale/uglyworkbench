import React, {Component} from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from 'axios';
import {makeData, Logo, Tips} from "./Utils/Utils";
import ItemNumAjust from './ItemNumAjust';
import Link from "react-router-dom/es/Link";


const subColumns = [
    {
        Header: "Name",
        columns: [
            {
                Header: "Manufacturer",
                accessor: "manufacturer"
            },
            {
                Header: "Weight",
                id: "weight",
                accessor: d => d.weight
            }
        ]
    },
    {
        Header: "Info",
        columns: [
            {
                Header: "Color",
                accessor: "color"
            },
            {
                Header: "Model Num",
                accessor: "model_num"
            }
        ]
    },
    {
        Header: "Stats",
        columns: [
            {
                Header: "Weight Units",
                accessor: "weight_units"
            }
        ]
    }
];



class ProductTablePage extends React.Component {


    constructor(props) {
        super(props)
        this.state = {data: []}
    }


    componentDidMount() {
        console.log("ProductTablePage componentDidMount")
        axios.get('/api/getAllProduct')
            .then(res => {
                console.log('componentDidMount ',res.data);
                this.setState({data:res.data});
                let subComponentData = []
                this.setSubComponentData(res.data,subComponentData);
                this.setState({subData:subComponentData});
                //console.log(subComponentData)
            });
    }

    setSubComponentData(data, newData){
        var a = data.map(

            (val, idx)=>{

                //console.log("map:",idx,val['description'])
                //newData.push({'details':val['details'], 'brief':val['description']})
                newData.push(val['details'])
            }

        )
    }


    onDeleteClick() {


    }


    render() {

        return (

            <div>
                <ReactTable
                    data={this.state.data}
                    columns={
                        [
                            {
                                Header: 'Name',
                                columns: [
                                    {
                                        Header: 'Name',
                                        accessor: 'name',
                                        Cell:row=>(
                                            <div style={{textAlign:'center'}}>
                                                <Link to={'/issues'}> {row.value} </Link>
                                            </div>
                                        ),
                                    },
                                    {
                                        Header: 'Description',
                                        id: 'description',
                                        accessor: d => d.description
                                    }]
                            },


                            {
                                Header: 'Info',
                                columns: [{
                                    Header: 'Shopping Cart',
                                    accessor: 'sku',
                                    Cell: row => (
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: '#dadada',
                                                borderRadius: '2px',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {/* <div
                                               style={{
                                                    width: `${row.value}%`,
                                                    height: '100%',
                                                    backgroundColor: row.value > 66 ? '#85cc00'
                                                        : row.value > 33 ? '#ffbf00'
                                                            : '#ff2e00',
                                                    borderRadius: '2px',
                                                    transition: 'all .2s ease-out'
                                                }}
                                            />*/}
                                            <ItemNumAjust refRow={row.original}/>
                                        </div>
                                    )
                                },
                                    {
                                        Header: 'Status SKU',
                                        accessor: 'sku',
                                        Cell: row => (
                                            <span>
                                    <span style={{
                                        color: row.value === 'relationship' ? '#ff2e00'
                                            : row.value === 'complicated' ? '#ffbf00'
                                                : '#57d500',
                                        transition: 'all .3s ease'
                                    }}>
                                      &#x25cf;
                                    </span> {
                                                row.value === 'relationship' ? 'In a relationship'
                                                    : row.value === 'complicated' ? `It's complicated`
                                                    : 'SKU '+row.value
                                            }
                                     </span>
                                        )
                                    }]
                            }]}
                    defaultPageSize={10}
                    className="-striped -highlight"

                    SubComponent={row => {
                        console.log("sub component table data:",row.original.details)
                        let subData = [row.original.details]
                        return (
                            <div style={{ padding: "5px" }}>
                                <em>
                                   more details about this item
                                </em>
                                <br />
                                <ReactTable
                                    data={subData}
                                    columns={subColumns}
                                    defaultPageSize={1}
                                    showPagination={false}
                                    /*SubComponent={row => {
                                        return (
                                            <div style={{ padding: "20px" }}>
                                                Another Sub Component!
                                            </div>
                                        );
                                    }}*/
                                />
                            </div>
                        );
                    }}

                />
                <br/>
                <Tips/>
                <Logo/>
            </div>


        )
    }
}

export default ProductTablePage