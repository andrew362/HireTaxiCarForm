import React, { Component } from 'react';
import {
    Modal,  Card, Button, Radio, 
} from 'antd';

const RadioGroup = Radio.Group;

const carList = [
    {
        id: 1,
        model: 'Opel Astra',
        price: '1000 PLN'
    },
    {
        id: 2,
        model: 'Mazda',
        price: '200 PLN'
    },
    {
        id: 3,
        model: 'Passat',
        price: '100 PLN'
    },
];


class Form2 extends Component {

    state = {
        value: this.props.value,
        modelChecked: '',
        visible: false
    };

    onChange = e => {
        this.setState({
            value: e.target.value,
        });
        this.setState({
            modelChecked: e.target.model,
        }, () => this.props.checkedCarModelHandler(this.state.modelChecked, this.state.value));

    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        return (
            <div>
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                    {carList.map((el) => {
                        return (
                            <Radio key={el.id} style={radioStyle} value={el.id} model={el}>
                                <Card
                                    style={{ marginTop: 16, display: 'inline-block', width: '100%' }}
                                    type="inner"
                                    title={el.model}
                                    hoverable={true}
                                    extra={<Button type="primary" onClick={this.showModal}>More</Button>}
                                >
                                    <img src="https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt={el.model} />
                                    <div style={{ float: 'right', lineHeight: '70px', fontWeight: 'bold' }}>{el.price}</div>
                                </Card>

                            </Radio>
                        );
                    })}

                </RadioGroup>
                <Modal
                    title="Car info"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <p>More info...</p>

                </Modal>
            </div>
        );
    }


}


export default Form2;