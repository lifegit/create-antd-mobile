import React from 'react';
import styles from './index.less';
import Skip from '../Skip';

interface Options {
  src: string;
  tip?: boolean;
  href?: string;
}

const Index: React.FC<Options> = (props) => (
  <Skip href={props.href}>
    <div className={styles.box}>
      {!props.tip && <div className={styles.advertisement}>广告</div>}
      <img
        className={styles.carouselImg}
        alt={props.src}
        src={props.src}
        onLoad={() => {
          window.dispatchEvent(new Event('resize'));
        }}
      />
    </div>
  </Skip>
)

export default Index;
