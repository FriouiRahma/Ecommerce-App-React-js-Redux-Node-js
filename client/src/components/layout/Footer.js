import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <div className='container'>
        <div className='footer-inner'>
          
          <div className='col-12 d-none'>
            <div className='row justify-content-between mb-40'>
              <div className='col'>
                <h6>Information</h6>
                <ul className='f-list'>
                  <li>
                    <Link to='/boutiques'>Boutiques List</Link>
                  </li>
                  <li>
                    <Link to='/'>Delivery Information</Link>
                  </li>
                  <li>
                    <Link to='/'>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to='/'>Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to='/'>Cookie</Link>
                  </li>
                </ul>
              </div>

              <div className='col'>
                <h6>Categories</h6>
                <ul>
                  <li>
                    <Link to='/'>Automotive</Link>
                  </li>
                  <li>
                    <Link to='/'>Electronics</Link>
                  </li>
                  <li>
                    <Link to='/'>Health & Beauty</Link>
                  </li>
                  <li>
                    <Link to='/'>Sport</Link>
                  </li>
                  <li>
                    <Link to='/'>Toys & Kids</Link>
                  </li>
                </ul>
              </div>
              <div className='col'>
                <h6>Advert</h6>
                <ul>
                  <li>
                    <Link to='/crop'>Crop Image</Link>
                  </li>
                  <li>
                    <Link to='/simplecrop'>Simple Image Crop</Link>
                  </li>
                  <li>
                    <Link to='/'>Deal Advert</Link>
                  </li>
                </ul>
              </div>
              <div className='col'>
                <h6>Advert</h6>
                <ul>
                  <li>
                    <Link to='/'>Advert List</Link>
                  </li>
                  <li>
                    <Link to='/'>Top Adverts</Link>
                  </li>
                  <li>
                    <Link to='/'>Deal Advert</Link>
                  </li>
                </ul>
              </div>
              <div className='col'>
                <h6>Stores</h6>
                <ul>
                  <li>
                    <Link to='/'>Top 10 Stores</Link>
                  </li>
                  <li>
                    <Link to='/'>Add own Store</Link>
                  </li>
                  <li>
                    <Link to='/'>Find in stores</Link>
                  </li>
                  <li>
                    <Link to='/'>Best product stores</Link>
                  </li>
                </ul>
              </div>
              <div className='col'>
                <h6>Customer Service</h6>
                <ul>
                  <li>
                    <Link to='/'>Contact Us</Link>
                  </li>
                  <li>
                    <Link to='/'>Returns policy</Link>
                  </li>
                  <li>
                    <Link to='/'>Site Map</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='newsletter'>
            <div className='newsletter-title'>Join our Newsletter</div>
            <input type='text' className='newsletter-email' placeholder='Your e-mail address' />
            <div className='newsletter-checkbox'>
              <input type='checkbox' className='custom-control-input newsletterCheck' />
              <label htmlFor='newsletterCheck'>
                Accept{" "}
                <a href='index.php?route=information/information&amp;information_id=5'>
                  terms and conditions
                </a>{" "}
                and{" "}
                <a href='index.php?route=information/information&amp;information_id=3'>
                  privacy policy
                </a>
              </label>
              <input type='submit' className='btn btn-newsletter' value='Submit' />
            </div>
          </div>

          <div className='copyright'>
            <p>
              © 2020 Big Mall. Powered By{" "}
              <Link
                to={{
                  pathname: "https://www.sofflex.com",
                }}
                target='_blank'
              >
                Sofflex
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
