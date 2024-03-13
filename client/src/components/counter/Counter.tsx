import React, {useState} from 'react';
import styles from './Counter.module.scss';

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  const increase = () => setCount(prev => prev + 1);

  const decrease = () => setCount(prev => prev - 1);

  return (
    <div>
      <h2 className={styles.counter__title}>{count}</h2>
      <button className={styles.counter__button} onClick={increase}>Increase</button>
      <button className={styles.counter__button} onClick={decrease}>Decrease</button>
    </div>
  );
};

export default Counter;