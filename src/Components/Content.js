import React, { Component } from 'react';
import { Steps, Button, message } from 'antd';
import Form1 from './Form1/Form';
import Form2 from './Form2/Form';
import Form3 from './Form3/Form';
import Table from './Table/Table';

const steps = [
    {
        title: 'Czas i adres'
    },
    {
        title: 'Wybierz auto'
    },
    {
        title: 'Dokonaj płatności'
    },
];


class Content extends Component {

    state = {
        current: 0,
        data: {
            firstForm: null,
            secondForm: {
                value: 0,
                modelChecked: '',
            },
            thirdForm: {
                userInfo: null
            }
        },
        stepBack: false
    }

    changeCurrentStepHandler = () => {
        let nextStep = this.state.current;
        nextStep++;
        this.setState({ current: nextStep++ });
    }

    saveDataFromFirstFormHandler = (values) => {
        let newData = { ...this.state.data };
        newData.firstForm = values;
        this.setState({ data: newData });
    }

    checkedCarModelHandler = (car, value) => {
        let newData = { ...this.state.data };
        newData.secondForm.modelChecked = car;
        newData.secondForm.value = value;
        this.setState({ data: newData });
    }

    next = () => {
        const current = this.state.current + 1;
        this.setState({ current });
        this.setState({ stepBack: true });
    }

    prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    userInfoHandler = (info) => {
        let newData = { ...this.state.data };
        newData.thirdForm.userInfo = info.userInfo;
        this.setState({ data: newData });
    }


    render() {
        const Step = Steps.Step;
        const { current } = this.state;

        return (
            <div className="container">
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="formsContainer">

                    {this.state.current === 0 ?
                        <Form1
                            saveDataFromFirstFormHandler={(values) => this.saveDataFromFirstFormHandler(values)}
                            changeCurrentStepHandler={this.next}
                            stepBack={this.state.stepBack}

                        /> : null
                    }

                    {this.state.current === 1 ?
                        <Form2
                            checkedCarModelHandler={(car, value) => this.checkedCarModelHandler(car, value)}
                            value = {this.state.data.secondForm.value}
                        /> : null
                    }

                    {this.state.current === 2 ?
                        <Form3 userInfoHandler={(info) => this.userInfoHandler(info)}>
                            <Table data={this.state.data} />
                        </Form3>
                        : null
                    }

                </div>
                <div className="buttonsFooter">
                    <div className="steps-action">
                        {current > 0 && (
                            <Button style={{ marginLeft: 8 }} onClick={this.prev}>
                                Wstecz
                        </Button>
                        )}
                        {current === 1 && (
                            <Button disabled = {this.state.data.secondForm.value === 0 ? true : false} type="primary" onClick={this.next}>
                                Dalej
                        </Button>
                        )}

                    </div>
                </div>
            </div>
        );
    }
}

export default Content;