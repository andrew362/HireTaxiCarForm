import React, { Component } from 'react';
import {
  Form, Button, DatePicker, message, TimePicker,
} from 'antd';
import Map from './Map';



class Form1 extends Component {

  state = {
    mapDataCel: null,
    mapDataOdbior: null,
    pickUpDate: '',
    pickUpTime: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        console.log('Sent values from form: ', this.state);
        if (this.state.mapDataCel && this.state.mapDataOdbior && this.state.pickUpDate && this.state.pickUpTime) {
          this.props.changeCurrentStepHandler();
          this.props.saveDataFromFirstFormHandler(this.state);
        } else {
          message.error("Uzupełnij wszystkie pola!");
        }
      }
    });
  }

  mapChangeCelHandler = (data) => {
    this.setState({ mapDataCel: data });
  }

  mapChangeOdbiorHandler = (data) => {
    this.setState({ mapDataOdbior: data });
  }

  pickUpDateChangeHandler = (date, dateString) => {
    this.setState({ pickUpDate: dateString });
  }
  pickUpTimeChangeHandler = (time, timeString) => {
    this.setState({ pickUpTime: timeString });
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };


    return (
      <React.Fragment>

        <Form {...formItemLayout}  className="firstForm">

          <Form.Item label="Odbiór">
            <Map
              google={this.props.google}
              zoom={15}
              mapChangeHandler={(data) => this.mapChangeOdbiorHandler(data)}
            />
          </Form.Item>
          <Form.Item label="Cel">
            <Map
              google={this.props.google}
              zoom={15}
              mapChangeHandler={(data) => this.mapChangeCelHandler(data)}
            />
          </Form.Item>
          <Form.Item label="Data odbioru" >
            <DatePicker onChange={this.pickUpDateChangeHandler} />
            <TimePicker onChange={this.pickUpTimeChangeHandler} format='HH:mm' />
          </Form.Item>
          <Form.Item className='procces' label=' '>
            <Button type="primary" onClick={this.handleSubmit}  className="form-button">
              {(this.props.stepBack) ? 'Popraw rezerwację' : 'Rozpocznij rezerwację'}
            </Button>
          </Form.Item>
        </Form>

      </React.Fragment>
    );
  }

}
const WrappedForm = Form.create({ name: 'First_Form' })(Form1);

export default WrappedForm;