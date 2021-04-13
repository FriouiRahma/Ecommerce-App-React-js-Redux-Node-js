import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { UpdateCategory } from "../../actions/categories";
import { Redirect } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
export const UpdateCategoryAdmin = ({
  match,
  history,
  categorieList,
  UpdateCategory,
  isAuthenticated,
  loading,
}) => {
  const currentcategory =
    categorieList &&
    categorieList.length !== 0 &&
    categorieList.filter((el) => el._id === match.params.id);
  const currcategoy = currentcategory[0];
  //console.log("currentcategory", currcategoy);
  const idParentcategoriy = currcategoy && currcategoy !== null && currcategoy.parent;
  //console.log("idParentcategoriy",idParentcategoriy)

  //name of parent category

  const filtredparent = categorieList.filter((el) => el._id === idParentcategoriy);
  const currfiltredparent = filtredparent[0];
  console.log("currfiltredparent",currfiltredparent)

  const [parentCategory, setparentCategory] = useState("0");
  const handelChangeParent = (e) => setparentCategory(e.target.value);
  const [formData, setFormData] = useState({
    parent: "",
    name: "",
    slug: "",
    order: "",
  });
  const { name, slug, order } = formData;
  //  const {parentCategory}=parentCategory
  useEffect(() => {
    if (currcategoy) {
      // setparentCategory((prevItems) => {
      //   return {
      //     ...prevItems,

      //     parentCategory: currcategoy.parent,

      //   };
      // });
      setFormData((prevItems) => {
        return {
          ...prevItems,

          name: currcategoy.name,
          slug: currcategoy.slug,
          order: currcategoy.order,
          id: currcategoy._id,
        };
      });
    }
  }, [currcategoy]);
  console.log("currentParent", parentCategory);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    UpdateCategory(formData, parentCategory, history);
  };

  if (!isAuthenticated) {
    if (!loading) return <Redirect to='/login' />;
  }
  const parentCategorie =
  categorieList && categorieList.length !== 0 && categorieList.filter((el) => el.parent === "0");
  //console.log('parentCategorie',parentCategorie&&parentCategorie.length!==0&& parentCategorie)

  return (
    <div>
      <AdminLayout>
        <div className='update-category'  >
      <h1> Modifier Catégorie</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          {/* <select onChange={handelChangeParent}>
            <option
              defaultValue={
                currfiltredparent && currfiltredparent != null && currfiltredparent.name
              }
            >
              {currfiltredparent && currfiltredparent != null && currfiltredparent.name}
            </option>
            {categorieList &&
              categorieList.length !== 0 &&
              categorieList.map((el, index) => (
                <option key={index} value={el._id}>
                  {el.name}
                </option>
              ))}
          </select> */}

      <label htmlFor=''>Liste des Catégories</label>
                      <select onChange={handelChangeParent}>
                      {parentCategorie &&
                        parentCategorie.length !== 0 &&
                        parentCategorie.map((el, index) => {
                        const soucat=categorieList&& categorieList.length!==0&& categorieList.filter(item=>item.parent===el._id)
                          return (<optgroup key={index} value={el._id}>  
                                <option value="0"  ></option>
                                <option  style={{ fontSize:"18px",  fontWeight:'bold'}}   value={el._id}>{el.name}</option> 
                                {soucat && soucat.length!==0&&soucat.map((sl,id)=> {
                                // const sousoucat=categorieList&&categorieList.length!==0&&categorieList.filter(sousoucat=>sousoucat.parent===sl._id   )
                                return <React.Fragment  key={id}>  <option style={{fontSize:"15px" , fontWeight:'600'  }} value={sl._id} >{sl.name }</option>
                                        {/* { sousoucat&&sousoucat.length!==0&&sousoucat.map((items,index)=> <option style={{fontSize:'13px'}}  key={index} value={items._id}   >{items.name }</option>      ) }  */}
                                      </React.Fragment> 
                                })} 
                                  </optgroup>
                                  
                                  
                                  )
                                
                        })}
                    </select>

           <div  className='form-group'>
             <label>Nom Catégorie</label>
          <input
            type='text'
            placeholder='name'
            name='name'
            onChange={(e) => onChange(e)}
            value={name || ""}
          />
        </div>
        </div>
        <div className='form-group'>
          <label>Slug</label>
          <input
            type='text'
            placeholder='slug'
            name='slug'
            onChange={(e) => onChange(e)}
            value={slug || ""}
          />
        </div>
        <div className='form-group'>
          <label>Ordre</label>
          <input
            type='text'
            placeholder='order'
            name='order'
            onChange={(e) => onChange(e)}
            value={order || ""}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Modifier boutique' />
      </form>
      </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
    categorieList: state.categories.list,
  };
};

export default connect(mapStateToProps, { UpdateCategory })(UpdateCategoryAdmin);
