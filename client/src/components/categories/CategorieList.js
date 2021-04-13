import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


export const CategorieList = ({ categories }) => {
  const catParent =
    categories && categories.length !== 0 && categories.filter((cat) => cat.parent === "0");
  return (
    <div className="container">
    <div className='page-categories'>
     
      {/* <div className='row'>
        {categorieList &&
          categorieList.length !== 0 &&
          categorieList.map((el) => (
            <div key={el._id} className='col-md-3'>
              <Link to={`/product-category/${el._id}`}>{el.name}</Link>
            </div>
          ))}
      </div> */}

      {/* <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant='link' eventKey='0'>
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion> */}
      <h1 className='header-page'>Liste des categories </h1>
      <div className='categories'>
        {catParent &&
          catParent.length !== 0 &&
          catParent.map((cat) => {
            let subCat = categories.filter((scat) => scat.parent === cat._id);
            let ret = (
              <div key={cat._id}>
                <Link className='catparent' to={`/product-category/${cat._id}`}>
                  {cat.name}
                </Link>
              </div>
            );
            if (subCat.length !== 0) {
              ret = (
                <div key={cat._id} className='has-child'>
                  <Link className='catparent' to={`/product-category/${cat._id}`}>
                    {cat.name}
                  </Link>
                  <div className='infos-category-parent'>
                    {subCat.map((scat) => {
                      let subsubCat = categories.filter(
                        (subsubCat) => subsubCat.parent === scat._id
                      );

                      if (subsubCat.length !== 0) {
                        return (
                          <div key={scat._id} className='sub'>
                            <div className='subsub row'>
                              <div className='col-md-12'>
                                <Link className='catnoeud' to={`/product-category/${scat._id}`}>
                                  {scat.name}
                                </Link>
                              </div>

                              {subsubCat.map((sscat) => {
                                return (
                                  <div key={sscat._id} className='subsub col-md-4'>
                                    <Link to={`/product-category/${sscat._id}`}>{sscat.name}</Link>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div key={scat._id} className='sub'>
                            <Link className='catnoeud' to={`/product-category/${scat._id}`}>
                              {scat.name}
                            </Link>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            }
            return ret;
          })}
      </div>
    </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories.list,
  };
};

export default connect(mapStateToProps   )(CategorieList);
