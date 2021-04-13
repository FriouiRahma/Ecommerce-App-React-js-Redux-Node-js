import React, { useState } from "react";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";

const PaginatedContent = ({productlsit}) => {
  // Data to be rendered using pagination.
   const todos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
   const todosPerPage = 3;
   const [ activePage, setCurrentPage ] = useState( 1 );
 console.log("productlsit",productlsit)
   // Logic for displaying current todos
   const indexOfLastTodo  = activePage * todosPerPage;
   const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
   const currentTodos     = productlsit.slice( indexOfFirstTodo, indexOfLastTodo );

   const renderTodos = currentTodos.map( ( prod, index ) => {
      return <li key={ index }>{ prod.name }</li>;
   } );

   const handlePageChange = ( pageNumber ) => {
      console.log( `active page is ${ pageNumber }` );
      setCurrentPage( pageNumber )
   };

   return (
      <div>
         <div className="result">
            {currentTodos.map( ( prod, index ) => {
                  return <li key={ index }>{ prod.name }</li>;
                    } ) }
         </div>
         <div className="pagination">
            <Pagination
               activePage={ activePage }
               itemsCountPerPage={ 3 }
               totalItemsCount={ todos.length }
               pageRangeDisplayed={ 3 }
               onChange={ handlePageChange }
            />
         </div>
      </div>
   )

}
const mapStateToProps = (state) => {
    return {
      productlsit: state.produits.listprod,

    };
  };

export default connect(mapStateToProps  ) (PaginatedContent);