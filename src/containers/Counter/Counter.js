// @flow
import React from 'react';
import style from './style.scss';

type CounterProps = {
  onIncrement: Function,
  onDecrement: Function,
  count: number,
}

export default function Counter(props: CounterProps) {
  const {
    onIncrement,
    onDecrement,
    count,
  } = props;

  return (
    <div>
      <div className={style['sample-counter']}>Counter</div>
      <button onClick={onIncrement}>+</button>
      {count}
      <button onClick={onDecrement}>-</button>
    </div>
  );
}
