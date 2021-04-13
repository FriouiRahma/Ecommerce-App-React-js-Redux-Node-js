import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { loadallProducts } from "../../actions/Produit";
export const TestScroll = ({loadallProducts,items}) => {
  
    console.log('produitlist',items)
useEffect(() => {
    loadallProducts()
}, [])

    const style = {
        height: 30,
        border: "1px solid green",
        margin: 6,
        padding: 8
      };
      //const items=[...itms]
      const [formData, setFormData] = useState({
        itemspro:[],
        hasMore: true
      });
      const todosPerPage = 4;
      const [ activePage, setCurrentPage ] = useState( 1 );
    
      // Logic for displaying current todos
      const indexOfLastTodo  = activePage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos     = items.slice( indexOfFirstTodo, indexOfLastTodo );
      const {itemspro,hasMore}=formData
      const fetchMoreData = () => {
        //setCurrentPage( pageNumber )
        if(itemspro.length <items.length){
         
          setFormData({...formData, hasMore: false });
          return; 
        }  
      } 

  if(itemspro.length <items.length){
      setTimeout(() => 
      setFormData({...formData, itemspro:itemspro.concat(currentTodos)}),500) }

      const handlePageChange = ( pageNumber ) => { 
        console.log( `active page is ${ pageNumber }` );
        setCurrentPage( pageNumber )
       };

    return (
      <div>
        <div>
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />
        <InfiniteScroll
         dataLength={items.length }
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          height={400}
          onChange={ handlePageChange }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        > 
          {itemspro&&itemspro.length!==0&& itemspro.map((i, index) => (
            <div  style={style} key={index}>
               
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </div>
      
      </div>
  
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.produits.listprod,
  };
};

export default connect(mapStateToProps,{loadallProducts})(TestScroll);
