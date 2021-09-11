import React from 'react';
import styles from './status.less';

export interface Options {
  text: string | React.ReactNode;
  icon: string;
}

const Status: React.FC<Options> = (props) => {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.box} >
        { props.icon && <img src={props.icon} alt='' /> }
        <div className={styles.text}>
          <p>{props.text}</p>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Status
