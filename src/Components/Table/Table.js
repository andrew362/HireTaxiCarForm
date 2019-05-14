import React from 'react';
import { Table } from 'antd';

const table = (props) => {

    const firstForm = props.data.firstForm;
    const secondForm = props.data.secondForm;


    const columns = [{
        dataIndex: 'id'
    }, {
        dataIndex: 'value'
    }];


    let dataSource;

    if (firstForm && secondForm) {


        dataSource = [{
            key: '1',
            id: 'Adres odbioru:',
            value: firstForm.mapDataOdbior.address
        }, 
        {
            key: '2',
            id: 'Data i czas odbioru:',
            value: `${firstForm.pickUpDate}, ${firstForm.pickUpTime}`
        }, 
        {
            key: '3',
            id: 'Współrzędne miejsca odbioru:',
            value: `${firstForm.mapDataOdbior.markerPosition.lat}, ${firstForm.mapDataOdbior.markerPosition.lng}`
        }, 
        {
            key: '4',
            id: 'Kierunek podróży:',
            value: firstForm.mapDataCel.address
        },
        {
            key: '5',
            id: 'Współrzędne podróży:',
            value: `${firstForm.mapDataCel.markerPosition.lat}, ${firstForm.mapDataCel.markerPosition.lng}`
        }, 
        {
            key: '6',
            id: 'Model samochodu:',
            value: secondForm.modelChecked.model
        },
        {
            key: '7',
            id: 'Cena wynajmu:',
            value: secondForm.modelChecked.price
        }

        ];
    }

    return (
        <div>
            {firstForm && secondForm ? <Table disable={true} pagination={false} showHeader={false} dataSource={dataSource} columns={columns} />
                : null
            }
        </div>
    )
}


export default table;