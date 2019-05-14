import React, { Component } from 'react';
import {
    Form, Input, Button, message, Modal, Icon
} from 'antd';


const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8, offset: 8 },
};

class Form3 extends Component {

    state = {
        validated: false,
        userInfo: {
            username: '',
            phone: ''
        }
    };

    check = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                this.setState({ validated: true });
                message.success('Formularz wysłany.');
                this.setState({ userInfo: values },
                    () => this.props.userInfoHandler(this.state));
                this.showModal(values);
            } else {
                this.setState({ validated: false });
                message.error('Uzupełnij poprawnie brakujące dane!');
            }
        });
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

        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <div>
                    <Form onSubmit={this.check} className="form3">
                        <Form.Item {...formItemLayout} label="Imię i Nazwisko">
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Podaj swoje imię i nazwisko',
                                        pattern: '^[A-Za-z]+$'
                                    },
                                ],
                            })(<Input name='username' placeholder="Podaj swoje imię i nazwisko" />)}
                        </Form.Item>

                        <Form.Item {...formItemLayout} label="Nr telefonu">
                            {getFieldDecorator('phone', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Podaj swój nr telefonu',
                                        pattern: '^[0-9]*$'
                                    },
                                ],
                            })(<Input name='phone' placeholder="Podaj swój nr telefonu" />)}
                        </Form.Item>
                        <Form.Item {...formTailLayout}>
                            <Button type="primary" htmlType="submit" >
                                Wyślij
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
                <Modal
                    title="Gratulacje właśnie wysłałeś formularz!"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <div>
                        <Icon type="user" /> Imię i nazwisko : <strong> {this.state.userInfo.username} </strong> <br />
                        <Icon type="phone" /> Nr telefonu : <strong> {this.state.userInfo.phone} </strong>
                        {this.props.children}
                    </div>

                </Modal>

                {this.props.children}
            </div>
        );
    }
}

const WrappedForm3 = Form.create({ name: 'Form3' })(Form3);

export default WrappedForm3;