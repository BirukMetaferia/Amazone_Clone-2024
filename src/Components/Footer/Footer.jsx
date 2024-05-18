import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.css'; // Import styles from module

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_contents}>
        <div className={styles.footer_social}>
          <FaFacebookF />
          <FaInstagram />
          <FaYoutube />
        </div>
        <div className={styles.footer_column}>
          <ul>
            <li>Careers</li>
            <li>Blog</li>
            <li>About Amazon</li>
          </ul>
        </div>
        <div className={styles.footer_column}>
          <ul>
            <li>Investor Relations</li>
            <li>Amazon Devices</li>
            <li>Amazon Tours</li>
          </ul>
        </div>
        <div className={styles.footer_column}>
          <ul>
            <li>Amazon Science</li>
            <li>Privacy Notice</li>
            <li>Cookies Notice</li>
          </ul>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <div className={styles.service_code}>Your Account</div>
        <div className={styles.copy_write}>&copy; 1996-2024, Amazon.com, Inc. or its affiliates</div>
      </div>
    </div>
  );
};

export default Footer;
