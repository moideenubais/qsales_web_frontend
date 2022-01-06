import React from 'react'
import ReactPaginate from 'react-paginate';
const Pagination = ({limit,offset,totalPages,handlePageClick}) => {
    let pageToBeSelected = parseInt(offset / limit);
    return (
        <ReactPaginate
            previousLabel={'Prev'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            previousClassName={'label-item page-item'}
            nextClassName={'label-item page-item'}
            pageClassName={'page-item'}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            forcePage={pageToBeSelected}
        />
    )
}

export default Pagination
