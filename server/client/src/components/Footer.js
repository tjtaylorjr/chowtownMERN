import React from 'react';
import { FaGithub, FaAngellist, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {

  const angel = "https://angel.co/u/tj-taylor-2";
  const linkedin = "https://www.linkedin.com/in/tj-taylor-6b9412196/";
  const github = "https://github.com/tjtaylorjr";
  const portfolio = "https://tjtaylorjr.github.io/";
  const email = "softwaredevelopmentbytj@gmail.com";

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
        <a href={`mailto:${email}`}>
          <FaEnvelope className="footer__icons" style={{ fill: '#FFFBF1' }} />
        </a>
      </footer>
    </div>
  )
};

export default Footer;
