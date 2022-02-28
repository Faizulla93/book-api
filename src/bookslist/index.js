import React from 'react';
import '../App.css';
// import ShowBook from './showbook';
// import { Link, Switch, Route} from 'react-router-dom';
const BooksList = ({books, showInfo, loadMore, totalItem})=> {
    if(!books || books.length === 0) return null
    return(
        <div>
            <h5 className="total">Total items: {totalItem}</h5> 
            <div className="card-container">
             {books.map((item)=> {
                return (
                    <div className="card" key={item.id}>
            <img src={(item.volumeInfo.readingModes.image) ? item.volumeInfo.imageLinks.smallThumbnail : 'No Photo'}
             className="card-image" alt="" />
             {item.volumeInfo.categories+" "}
            <div className="card-body">
            <h5 className="card-title">{item.volumeInfo.title}</h5>
            <p className="card-text">
            { item.volumeInfo.authors + " " } 
            </p>
            
            <button
            onClick={()=> showInfo(item.id)}
            className="btn btn-secondary">View</button>
                </div>
                      </div>
                )
            })}
        </div>
        <div className="btn btn-primary"
        onClick={()=> loadMore()}>Load More</div>
        </div>
    )
}

export default BooksList;