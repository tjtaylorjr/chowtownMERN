import React from 'react';
import { FaGithub, FaAngellist, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {

  const angel = process.env.REACT_APP_ANGEL;
  const linkedin = process.env.REACT_APP_LINKEDIN;
  const github = process.env.REACT_APP_GITHUB;
  const portfolio = process.env.REACT_APP_PORTFOLIO;
  const email = process.env.REACT_APP_EMAIL;

  return (
    <div className="footer">
      {/* {footer_gradient} */}
      <footer>
        <a href={github} >
          <FaGithub className="footer__icons" style={{ fill: '#FFFBF1' }} />
        </a>
        <a href={linkedin} >
          <FaLinkedin className="footer__icons" style={{ fill: '#FFFBF1' }} />
        </a>
        <span className="footer__text">
          <a href={portfolio} >
            Created by TJ Taylor ©2021
          </a>
        </span>
        <a href={angel} >
          <FaAngellist className="footer__icons" style={{ fill: '#FFFBF1' }} />
        </a>
        <a href={email}>
          <FaEnvelope className="footer__icons" style={{ fill: '#FFFBF1' }} />
        </a>
      </footer>
    </div>
  )
};

export default Footer;
