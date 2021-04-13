import React,{useEffect} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadBoutiques } from "../../actions/Boutiques";
import data from "../../utils/default.json";

const BoutiqueGros = ({ boutiquesList }) => {
    useEffect(() => {
    //dispatch action loadBoutiques to the back
     loadBoutiques();
  }, [loadBoutiques]);
 

 const boutiquesgros=boutiquesList &&boutiquesList.length!==0&& boutiquesList.filter(el=>el.type ==="1")
       console.log('boutiquesgros',boutiquesgros)

        return (
            <div className="container">
            <div className='boutiquesList'>
           
            <h1 className='title-bout-list'>Liste des boutiques</h1>
            <div className='row'>
                {boutiquesgros&&boutiquesgros.length!==0&&boutiquesgros.map((bout) => (
                <div key={bout._id} className='col-lg-3 col-md-4 col-sm-6 mb-20'>
                    <Link to={`/boutique/${bout._id}`}>
                    <div className='boutiqueItem'>
                        {(() => {
                        let path = data.backUrl + "/uploads/" + bout.photo;
                        // let bb = checkImage(path).then((e) => {
                        //   console.log(e.status);
                        // });

                        if (bout.photo) {
                            return (
                            <div className='image' style={{ backgroundImage: `url(${path})` }}></div>
                            );
                        } else {
                            return (
                            <div
                                className='image'
                                style={{ backgroundImage: 'url("no-img1.png")' }}
                            ></div>
                            );
                        }
                        })()}

                        <div className='infos'>
                        <div className='title'>{bout.name}</div>
                        <div className='description'>{bout.description}</div>
                        </div>
                    </div>
                    </Link>
                </div>
                ))}
            </div>
            </div>
            </div>
        );
};

const mapStateToProps = (state) => {
  return {
    boutiquesList: state.boutiques.list,
  };
};

export default connect(mapStateToProps, { loadBoutiques })(BoutiqueGros);
