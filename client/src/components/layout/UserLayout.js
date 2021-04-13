import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export const UserLayout = ({ children, boutique, listboutique, user }) => {
  let hasboutique = [];
  let boutiqueofcommande = null;
  // if(user){
  //   hasboutique=listboutique.filter(el=>el.user === user._id)
  // }

  //   console.log("hasboutique",hasboutique)

  //   if (boutique && boutique.length !== 0) {
  //     boutiqueofcommande = boutique[0];
  //     console.log("boutiqueofcommande", boutiqueofcommande);
  //   }
  return (
    <div>
      <div className="container">
        <ul className="boutique-nav">
          {/* {hasboutique&&hasboutique.length!==0&&
         <li>
         <Link to='/boutiqueuser'>Mon Boutique</Link>
       </li> } */}
          {/* <li>
         <Link to='/boutiqueuser'>Mon Boutique</Link>
       </li> */}
          <li className="modif-bout">
            <Link to="/updateboutique">Modifier Boutique</Link>
          </li>
          <li className="add-prod">
            <Link to={`/addproduit`}> Ajouter Produit </Link>
          </li>
          <li className="commande-bout">
            <Link to={`/commande-boutique`}>Mes commandes</Link>
          </li>
          {/* <li>
          <Link
            to={`/commande-boutique/${boutique&&boutique.length!==0&&  boutique[0]._id}`}
          >
            Mes commandes
          </Link>
        </li> */}
          {/* <li>
            <Link to={`/add-commercial`}> Ajouter commercial </Link>
          </li> */}

          {/* <li>
            <Link to={`/list-Editor-boutique`}> Editeurs Boutique </Link>
          </li> */}
        </ul>
      </div>
      <div className="content-user">{children}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    boutique: state.boutiques.boutiqueuser,
    user: state.users.user,
    listboutique: state.boutiques.list,
  };
};

export default connect(mapStateToProps)(UserLayout);
