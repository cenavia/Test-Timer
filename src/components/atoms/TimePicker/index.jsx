import React from 'react'
import { Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { TextWrapper, LengthLabel } from './styles'
import { Col } from 'antd';

const TimePicker = (props) => {
  const { increment, decrement, length } = props;
  return (
    <Col md={4}>
      <TextWrapper>
        Time-Programer
      </TextWrapper>
      <Button type="primary" shape="circle" onClick={increment} icon={<PlusOutlined />} />
      <LengthLabel>{length / 60}</LengthLabel>
      <Button type="primary" shape="circle" onClick={decrement} icon={<MinusOutlined />} />
    </Col>
  );
};
export default TimePicker;