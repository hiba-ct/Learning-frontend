import { faFacebook, faInstagram, faLinkedinIn, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className="footer container-fluid bg-success text-white pt-5 pb-4 mt-5">
        <div className="container">
          <div className="row">
            {/* Left Section */}
            <div className="col-lg-4 col-md-6 mb-4">
              <h5 className="text-danger">
                <FontAwesomeIcon className="me-2" style={{ color: "black" }} icon={faUniversity} />
                Eduversity
              </h5>
              <p className="small-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Autem pariatur consequuntur repellat obcaecati odio dolore ea natus earum eum,
                sapiente nesciunt a totam fugiat doloremque ipsum quo neque modi.
              </p>
            </div>

            {/* Middle Section - Links */}
            <div className="col-lg-2 col-md-6 mb-4">
              <h5>Links</h5>
              <ul className="list-unstyled">
                <li><Link className="footer-link" to="/">Home</Link></li>
                <li><Link className="footer-link" to="/login">Courses</Link></li>
                <li><Link className="footer-link" to="/login">Contact</Link></li>
              </ul>
            </div>

            {/* Guides Section */}
            <div className="col-lg-2 col-md-6 mb-4">
              <h5>Guides</h5>
              <ul className="list-unstyled">
                <li>React</li>
                <li>React Bootstrap</li>
                <li>Routing</li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="col-lg-4 col-md-6">
              <h5>Contact Us</h5>
              <div className="input-group my-3">
                <input type="text" className="form-control" placeholder="Enter your Email" />
                <button className="btn btn-danger">→</button>
              </div>

              {/* Social Icons */}
              <div className="d-flex gap-3 fs-5">
              <Link to={'https://getbootstrap.com/'}style={{ textDecoration:'none',color:'white' }}>
              <i className='fa-solid fa-envelope'></i></Link>
              <Link to={'https://www.youtube.com/watch?v=k5E2AVpwsko'}style={{ textDecoration:'none',color:'white' }}>
<i className="fa-brands fa-youtube" /></Link>

<Link to={'https://getbootstrap.com/'}style={{ textDecoration:'none',color:'white' }}>
<i className="fa-brands fa-whatsapp" /></Link>

<Link to={'https://getbootstrap.com/'}style={{ textDecoration:'none',color:'white' }}>
<i className="fa-brands fa-instagram" /></Link>

<Link to={'https://getbootstrap.com/'}style={{ textDecoration:'none',color:'white' }}>
<i className="fa-brands fa-twitter" /></Link>

<Link to={'https://getbootstrap.com/'}style={{ textDecoration:'none',color:'white' }}>
<i className="fa-brands fa-facebook" /></Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-4 pt-3 border-top">
          <p className="m-0">Copyright © 2024 Eduversity. Built with React.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
