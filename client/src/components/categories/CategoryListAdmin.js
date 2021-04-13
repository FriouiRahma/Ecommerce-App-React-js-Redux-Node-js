import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { Accordion, Card, Button } from "react-bootstrap";
import noteIcon from "../../icons/note.svg";
import deleteIcon from "../../icons/dustbin.svg";
import { deletecatwithoutchild } from "../../actions/categories";
import { confirmAlert } from "react-confirm-alert";
export const CategoryListAdmin = ({ categorieList, deletecatwithoutchild }) => {
  const parentCategorie = categorieList && categorieList.length !== 0 && categorieList.filter((el) => el.parent === "0");
  const submit = (id) => {
    confirmAlert({
      message: "Voulez-vous supprimez ce produit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deletecatwithoutchild(id),
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
        <div className="category-list-admin">
          <h1>liste des categories</h1>
          {/* <div className='row'>
            <div  className='col-lg-9' >
              {categorieList&&categorieList.length!==0&&
              <div className='group-cat' >
              <di  className='item-cat'  >name category</di> 
              <div className='item-cat'   >order category</div>
              <div className='item-cat'   ></div>
              </div>    }
          {categorieList &&
            categorieList.length !== 0 &&
            categorieList.map((el) => (
              <div key={el._id}  className='group-cat' >
               <div className='item-cat' > {el.name}</div>
               <div className='item-cat' > {el.order} </div>
               <div className='item-cat' ><Link className=' btn  btncat'   to={`/update-categry-admin/${el._id}`}> Modifier catégorie</Link></div>
                
              </div>
            
            ))}</div></div> */}
          <div className="categories-acc">
            <Accordion>
              {parentCategorie &&
                parentCategorie.length !== 0 &&
                parentCategorie.map((item, index) => {
                  const souscat = categorieList.filter((el) => el.parent === item._id);
                  return (
                    <Card key={index}>
                      <Card.Header>
                        <div className="check-group">
                          <label htmlFor={item._id}>{item.name}</label>
                          <Link to={`/update-categry-admin/${item._id}`}>
                            <img src={noteIcon} alt="" className="iconedit" title="Edit" />
                          </Link>

                          {souscat.length === 0 && (
                            <img
                              onClick={() => {
                                submit(item._id);
                              }}
                              src={deleteIcon}
                              alt=""
                              className="icon-delete"
                              title="Delete"
                            />
                          )}
                        </div>

                        <Accordion.Toggle as={Button} variant="link" eventKey={`acc_${index}`}></Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={`acc_${index}`}>
                        <Card.Body>
                          <Accordion>
                            {souscat &&
                              souscat.length !== 0 &&
                              souscat.map((sucat, index) => {
                                const sussouscat = categorieList.filter((susucat) => susucat.parent === sucat._id);
                                return (
                                  <Card key={index}>
                                    <Card.Header>
                                      <div className="check-group">
                                        <label htmlFor={sucat._id}>{sucat.name}</label>
                                        <Link to={`/update-categry-admin/${sucat._id}`}>
                                          <img src={noteIcon} alt="" className="iconedit" />
                                        </Link>
                                        {sussouscat.length == 0 && (
                                          <img
                                            onClick={() => {
                                              submit(sucat._id);
                                            }}
                                            src={deleteIcon}
                                            alt=""
                                            className="icon-delete"
                                            title="Delete"
                                          />
                                        )}
                                        {/* <Link className='btn btncat'  to={`/update-categry-admin/${sucat._id}`}> Modifier catégorie</Link> */}
                                      </div>
                                      <Accordion.Toggle as={Button} variant="link" eventKey={`subacc_${index}`}></Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={`subacc_${index}`}>
                                      <Card.Body>
                                        {sussouscat &&
                                          sussouscat.length !== 0 &&
                                          sussouscat.map((el) => {
                                            return (
                                              <div key={el._id} className="card-header">
                                                <div className="check-group">
                                                  <label htmlFor={el._id}>{el.name}</label>
                                                  <Link to={`/update-categry-admin/${el._id}`}>
                                                    <img src={noteIcon} alt="" className="iconedit" />
                                                  </Link>
                                                  <img
                                                    onClick={() => {
                                                      submit(el._id);
                                                    }}
                                                    src={deleteIcon}
                                                    alt=""
                                                    className="icon-delete"
                                                    title="Delete"
                                                  />
                                                  {/* <Link  className='btn btncat' to={`/update-categry-admin/${el._id}`}> Modifier catégorie</Link> */}
                                                </div>
                                              </div>
                                            );
                                          })}
                                      </Card.Body>
                                    </Accordion.Collapse>
                                  </Card>
                                );
                              })}
                          </Accordion>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  );
                })}
            </Accordion>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categorieList: state.categories.list,
  };
};

export default connect(mapStateToProps, { deletecatwithoutchild })(CategoryListAdmin);
