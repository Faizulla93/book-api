import React from 'react';

const ShowBook = ({ detail, closeInfo })=> {
    
    return (
        <>
        <div className="modal-box">
        <button className="btn btn-secondary" id="close-btn"
        onClick={()=> closeInfo()} >X</button>
        <div className="wrap_info">
            <div className="left-block">
        <img src={(detail.volumeInfo.readingModes.image) ? detail.volumeInfo.imageLinks.thumbnail : 'No Photo'}
        alt="" className="card-image-info" /></div>
        <div className="right-block">
        <h4> {detail.volumeInfo.title} </h4>
    <p>{detail.volumeInfo.description}</p>
        </div>
        </div>
        </div>
        </>
    )
}

export default ShowBook;