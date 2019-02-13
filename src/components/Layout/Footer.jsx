import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import React from 'react';

const Footer = props => (
  <footer className="site-footer" role="region">
    <div className="site-footer-col">
      <div className="site-footer-links" role="navigation">
        <Link className={`site-footer-link ${props.page}-active`}
          id="footer-link-legal"
          role="link"
          title="(MIT) License"
          to="/legal"
        >
          Legal
        </Link>
        <Link className={`site-footer-link ${props.page}-active`}
          id="footer-link-terms"
          role="link"
          title="Terms and Conditions"
          to="/terms"
        >
          Terms &amp; Conditions
        </Link>
        <Link className={`site-footer-link ${props.page}-active`}
          id="footer-link-privacy"
          role="link"
          title="Privacy Policy"
          to="/privacy"
        >
          Privacy
        </Link>
      </div>
    </div>
  </footer>
);

Footer.propTypes = { page: string };

export default Footer;
