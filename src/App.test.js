import React from 'react';
import { render } from '@testing-library/react';

import CountDown from '../src/components/CountDown/index'

test('2 seconds is parsed correctly', () => {
  expect(CountDown(2)).toEqual('00:00:02');
})

test('70 seconds is parsed correctly', () => {
  expect(CountDown(70)).toEqual('00:01:10');
})