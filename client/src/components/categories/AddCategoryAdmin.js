import React, { useState } from "react";
import { addCategory } from "../../actions/categories";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
export const AddCategoryAdmin = ({
  addCategory,
  history,
  categoriess,
  isAuthenticated,
  loading,
}) => {
  const [parentCategory, setparentCategory] = useState("0");

  const handelChangeParent = (e) => setparentCategory(e.target.value);
  //console.log("parentCategorie",parentCategory)

  //https://o7planning.org/fr/11923/reactjs
  //https://o7planning.org/fr/12145/tutoriel-react-form
  //https://stackblitz.com/edit/react-select-hook
  //https://stackoverflow.com/questions/58114855/handling-select-options-in-react-hooks
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    order: "",
  });
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const { name, slug, order } = formData;
  const onSubmit = async (e) => {
    e.preventDefault();
    addCategory(
      {
        parent: parentCategory,
        name,
        slug,
        order,
      },
      history,
      console.log('add cat',{
        parent: parentCategory,
        name,
        slug,
        order,
      })
    );
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to='/login' />;
  }
  const parentCategorie =
  categoriess && categoriess.length !== 0 && categoriess.filter((el) => el.parent === "0");
  //console.log('parentCategorie',parentCategorie&&parentCategorie.length!==0&& parentCategorie)
  return (
    <div>
      <div className='ce-form'>
      <AdminLayout>
        <div className='add-category-admin'  >
        <h1 >Ajouter une nouvelle Catégorie</h1>
        <form onSubmit={(e) => onSubmit(e)}>


            <label htmlFor=''>Liste des Catégories</label>
                <select onChange={handelChangeParent}>
                {parentCategorie &&
                  parentCategorie.length !== 0 &&
                  parentCategorie.map((el, index) => {
                  const soucat=categoriess&& categoriess.length!==0&& categoriess.filter(item=>item.parent===el._id)
                    return (<optgroup key={index} value={el._id}>  
                          <option value="0"  ></option>
                           <option  style={{ fontSize:"18px",  fontWeight:'bold'}}   value={el._id}>{el.name}</option> 
                           {soucat && soucat.length!==0&&soucat.map((sl,id)=> {
                           const sousoucat=categoriess&&categoriess.length!==0&&categoriess.filter(sousoucat=>sousoucat.parent===sl._id   )
                           return <React.Fragment  key={id}>  <option style={{fontSize:"15px" , fontWeight:'600'  }} value={sl._id} >{sl.name }</option>
                                  {/* { sousoucat&&sousoucat.length!==0&&sousoucat.map((items,index)=> <option style={{fontSize:'13px'}}  key={index} value={items._id}   >{items.name }</option>      ) }  */}
                                 </React.Fragment> 
                          })} 
                            </optgroup>
                            
                            
                            )
                           
                  })}
              </select>

              <div className='form-group'>
                <label htmlFor=''>Category Name</label>
                <input type='text' name='name' onChange={(e) => onChange(e)} value={name} />
              </div>
              <div className='form-group'>
                <label htmlFor=''>Slug</label>
                <input type='text' name='slug' onChange={(e) => onChange(e)} value={slug} />
              </div>
              <div className='form-group'>
                <label htmlFor=''>Order</label>
                <input type='text' name='order' onChange={(e) => onChange(e)} value={order} />
              </div>

              <input type='submit' className='btn btn-primary' value='Ajouter' />
           
          
        </form>
        </div>
        </AdminLayout>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  loading: state.users.loading,
  categoriess: state.categories.list,
});

export default connect(mapStateToProps, { addCategory })(AddCategoryAdmin);
