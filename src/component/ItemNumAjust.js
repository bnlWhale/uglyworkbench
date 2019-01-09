import React from 'react';
import {Button, Glyphicon, Table, Panel} from 'react-bootstrap';
import OverlayTrigger from "react-bootstrap/es/OverlayTrigger";
import Tooltip from 'react-bootstrap/es/Tooltip';
import PropTypes from "prop-types";

const tooltip =(msg)=>(
    <Tooltip id="tooltip">
        <strong>{msg}</strong>
    </Tooltip>
);

class ItemNumAjust extends React.Component {


    constructor(props) {
        super(props)
        this.state = {num:0}
        this.handleClickPlus = this.handleClickPlus.bind(this);
        this.handleClickMinus = this.handleClickMinus.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClickPlus(e) {
        e.preventDefault()
        this.setState( (prevState) => ({
            num:prevState.num+1
        }))

    }

    handleClickMinus(e) {
        e.preventDefault()
        this.setState( (prevState) => {
            if(prevState.num>0){
                return { num:prevState.num-1}
            }
        })

    }

    componentDidMount() {

        console.log('ItemNumAjust componentDidMount',this)
    }
    componentWillUnmount(){
        //console.log('ItemNumAjust componentWillUnmount')
    }

    handleChange(e){

       e.preventDefault()
        if (e.target.value.match(/^\d*$/)) {
            this.setState({ num: e.target.value });
        }
    }

    render() {
        //console.log("ItemNumAjust",this.props.refRow.name)
        let strName = this.props.refRow.name
        return (
            <div>
                <OverlayTrigger placement="top" overlay={tooltip(strName)}>
                    <span style={{marginRight:10}} className="glyphicon glyphicon-shopping-cart"></span>
                </OverlayTrigger>
                <Button bsSize="xsmall" onClick={this.handleClickPlus}><Glyphicon glyph="plus"/></Button>
                <input type="text" style={{width: 30, textAlign:'center', color:'blue'}} placeholder="0" aria-label="Username"
                       aria-describedby="basic-addon" value={this.state.num} onChange={this.handleChange}/>
                <Button bsSize="xsmall" onClick={this.handleClickMinus}><Glyphicon glyph="minus"/></Button>
            </div>
        )

    }

};

ItemNumAjust.propTypes = {
    refRow:PropTypes.object.isRequired
}

export default ItemNumAjust