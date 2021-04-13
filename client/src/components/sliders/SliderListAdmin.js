import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadSliders, removeslider } from "../../actions/sliders";
import { Link } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { Redirect } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import data from "../../utils/default.json";
import deleteIcon from "../../icons/dustbin.svg";
import noteIcon from "../../icons/note.svg";
const SliderListAdmin = ({ loadSliders, removeslider, sliderlist, isAuthenticated, loading }) => {
  useEffect(() => {
    loadSliders();
  }, [loadSliders]);
 
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  const submit = (id) => {
    confirmAlert({
      message: "Voulez-vous supprimez ce produit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => removeslider(id),
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };
  return (
    <div>
      <AdminLayout>
        <div className="slider-list-admin">
          <h1 className="title">Liste des slider</h1>
          <table className="table-slider">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>Nom</th>
                <th style={{ width: "20%" }}>Image</th>
                <th style={{ width: "10%" }}>Description</th>
                <th style={{ width: "10%" }}>Modifier</th>
                <th style={{ width: "10%" }}>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {sliderlist &&
                sliderlist.length !== 0 &&
                sliderlist.map((el) => (
                  <React.Fragment key={el._id}>
                    <tr>
                      <td>{el.titre}</td>
                      <td>
                        <figure>
                          <img className="slider-image" src={`${data.backUrl}/uploads/sliders/${el.photo}`} alt="" />
                        </figure>
                      </td>
                      <td>{el.description}</td>
                      <td>
                        <Link to={`/updateslideradmin/${el._id}`}>
                          <img className="icon-edit" src={noteIcon} alt="" />
                        </Link>
                      </td>
                      <td>
                        <img
                          onClick={() => {
                            submit(el._id);
                          }}
                          src={deleteIcon}
                          alt=""
                          className="icon-delete"
                          title="Delete"
                          alt=""
                        />
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    sliderlist: state.sliders.listslider,
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps, { loadSliders, removeslider })(SliderListAdmin);
