import React, {FC} from 'react';
import styles from './Logo.module.scss';


interface ILogo {
    width?: string,
    height?: string
}

const Logo: FC<ILogo> = ({width, height}) => {
    return (
        <div className={styles.logo_holder}>
            <img
                style={{
                    width: width,
                    height: height
                }}
                src="/logo512.png"
                alt="site-logo"
                loading="lazy"
            />
            <span className={styles.logo_holder_text}>FFGlobal - фулфилмент полного цикла</span>
        </div>
    );
};

export default Logo;