import React from 'react';
import {
    DashboardOutlined
  } from '@ant-design/icons';
import {VibracionAnimation} from './styles';

const Animation = props => {
    return (
        <VibracionAnimation>
            <DashboardOutlined style={{ fontSize: '50px' }}/>
        </VibracionAnimation>
    );
};


export default Animation;