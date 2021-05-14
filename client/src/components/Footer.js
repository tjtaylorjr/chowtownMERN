import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBriefcase, FaGithub, FaAngellist, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {

  const angel = process.env.REACT_APP_ANGELLIST;
  const linkedin = process.env.REACT_APP_LINKEDIN;
  const github = process.env.REACT_APP_GITHUB;
  const portfolio = process.env.REACT_APP_PORTFOLIO;
  const email = process.env.REACT_APP_EMAIL;

  const footer_gradient = (
    <svg width="0" height="0">
      <linearGradient id="footer_gradient" x1="100%" y1="100%" x2="0%" y2="0%">
        <stop stopColor="#766237" offset="0%" />
        <stop stopColor="#E6CD8C" offset="50%" />
        <stop stopColor="#766237"
          offset="100%" />
      </linearGradient>
    </svg>
  )
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
