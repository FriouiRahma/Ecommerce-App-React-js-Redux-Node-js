import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/users";
import logo from "../../icons/logo.svg";
import searchIcon from "../../icons/search-white.svg";
import shoppingIcon from "../../icons/shopping-cart.svg";
import heartIcon from "../../icons/heart.svg";

import facebookIcon from "../../icons/facebook.svg";
import instagramIcon from "../../icons/instagram.svg";
import youtubeIcon from "../../icons/youtube.svg";
import tiktokIcon from "../../icons/tiktok.svg";

const Navbar = ({ users, logout, listboutique, userslike, commandenumber }) => {
  const { isAuthenticated } = users;
  let hasboutique = [];
  if (isAuthenticated && users.user) {
    hasboutique = listboutique.filter((el) => el.user === users.user._id);
    //console.log("hasboutique", hasboutique);
  }

  let BoutiqueEditor = [];
  if (isAuthenticated && users.user) {
    if (listboutique && listboutique.length !== 0) {
      listboutique.map((el) => {
        el.editors.map((Ed) => {
          if (Ed.editor === users.user._id) {
            BoutiqueEditor = [...BoutiqueEditor, el];
          }
        });
      });
    }
  }

  //console.log("userslike", userslike);

  //console.log("boutique navbar", boutique);

  let role = "-1";
  if (users.user && isAuthenticated) {
    role = users.user.role;
  }

  //console.log("User in nav", users);

  const adminLinks = (
    <ul>
      <li>
        <Link to='/admin-dashboard'>Tableau de bord</Link>
      </li>

      <li>
        <Link to='/profile'>Bonjour {users.user && users.user !== null && users.user.firstname}</Link>
      </li>

      <li>
        <Link to='/' onClick={logout}>
          Déconnexion
        </Link>
      </li>
    </ul>
  );

  const userLinks = (
    <ul>
      <li>
        <Link to='/profile'>Bonjour {users.user && users.user !== null && users.user.firstname}</Link>
      </li>
      <li>
        <Link to='/commande-list-user'>Mes Achats</Link>
      </li>
      {/* verify if client has Boutique */}

      {BoutiqueEditor && BoutiqueEditor.length !== 0 && (
        <li>
          <Link to={`/Editor-boutique`}>Editeur </Link>
        </li>
      )}

      {hasboutique && hasboutique.length !== 0 ? (
        <li>
          <Link to={`/boutiqueuser`}>Mon Boutique</Link>
        </li>
      ) : (
        <li>
          <Link to='/addbouitque'>AjouterBoutique</Link>
        </li>
      )}
      <li>
        {" "}
        <Link to='/' onClick={logout}>
          Déconnexion
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Inscrivez-Vous</Link>
      </li>
      <li>
        <Link to='/login'>Connectez-Vous</Link>
      </li>
    </ul>
  );

  const links = () => {
    if (role === "0") {
      return userLinks;
    } else if (role === "1") {
      return adminLinks;
    } else {
      // role -1
      return guestLinks;
    }
  };

  return (
    <Fragment>
      <div className='header'>
        <div className='header-top'>
          <div className='container'>
            <div className='header-top-inner'>
              <ul className='nav-submenu'>
                <li>
                  <Link to='/'>Acceuil</Link>
                </li>
                <li>About</li>
                <li>Contactez-Nous</li>
              </ul>
              <ul className='email-top'>
                <li>
                  Avez-vous des questions <a href='mailto:contact@bigmall.com'>contact@bigmall.com</a>
                </li>
              </ul>
              <ul className='social-icons'>
                <li className='facebook'>
                  <Link
                    to={{
                      pathname: "https://www.facebook.com/Big-Mall-101160678151916/",
                    }}
                    target='_blank'
                  >
                    <img src={facebookIcon} alt='facebook' title='Facebook' />
                  </Link>
                </li>
                <li className='instagram'>
                  <Link
                    to={{
                      pathname: "https://www.instagram.com/bigmall_tn/",
                    }}
                    target='_blank'
                  >
                    <img src={instagramIcon} alt='instagram' title='Instagram' />
                  </Link>
                </li>
                <li className='youtube'>
                  <Link
                    to={{
                      pathname: "https://www.youtube.com/channel/UC1SqbmuwPjdUqZW6wruZT0g?view_as=subscriber",
                    }}
                    target='_blank'
                  >
                    <img src={youtubeIcon} alt='youtube' title='Youtube' />
                  </Link>
                </li>
                <li className='tiktok'>
                  <Link
                    to={{
                      pathname: "https://www.tiktok.com/@bigmall_tunisie?lang=en",
                    }}
                    target='_blank'
                  >
                    <img src={tiktokIcon} alt='tiktok' title='Tiktok' />
                  </Link>
                </li>
              </ul>
              {links()}
            </div>
          </div>
        </div>
        <div className='header-middle'>
          <div className='container'>
            <div className='header-middle-inner'>
              <Link
                to='/'
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <div className='logo'>
                  <img src={logo} className='App-logo' alt='logo' />
                </div>
              </Link>
              <form id='search' className='search-form'>
                <input type='text' className='search-input' placeholder='Rechercher' autoComplete='off' />
                <button type='submit' className='search-icon'>
                  <img src={searchIcon} alt='Search' />
                </button>
              </form>
              <div className='header-icons'>
                <Link to='/commandes' className='commande-container'>
                  <img src={shoppingIcon} alt='Shopping' />
                  <div className='count-commandes'>{commandenumber && commandenumber.length}</div>
                </Link>
                <Link to='/like' className='wishlist-container'>
                  <img src={heartIcon} alt='Wishlist' />
                  <div className='count-likes'>{userslike.length}</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='header-bottom'>
          <div className='container'>
            <div className='header-bottom-inner'>
              <div className='categories'>
                <span className='icon-hamburger'>
                  <svg viewBox='0 0 75 75' width='10' height='10'>
                    <rect width='75' height='15'></rect>
                    <rect y='30' width='75' height='15'></rect>
                    <rect y='60' width='75' height='15'></rect>
                  </svg>
                </span>
                <span>Shop by category</span>
              </div>
              <div className='menu-list'>
                <ul>
                  <li>
                    <Link to='/boutiques'>Tous les Boutiques</Link>
                  </li>
                  <li>Annonces</li>
                  <li>
                    <Link to='/categories'>Categories</Link>
                  </li>
                  <li>Stories</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div id='breadcrumb' className='breadcrumb-holder container'>
        <ul className='breadcrumb'>
          <li>
            <a href='/'>Home</a>
          </li>

          <li className='active'>Account</li>
        </ul>
      </div> */}

      {/*users.user ? "user" : "no user"*/}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
  //boutique: state.boutiques.boutiqueuser,
  listboutique: state.boutiques.list,
  userslike: state.likes.likeuserlist,
  commandenumber: state.commandes.products,
});

export default connect(mapStateToProps, { logout })(Navbar);
