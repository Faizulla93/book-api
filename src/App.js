import React, { Component } from 'react';
import BooksList from './bookslist';
import './App.css';
import ShowBook from './showbook';
import loadService from './bookslist/loadservice';

class Search extends Component{
    state = {
        books: [],
        value: '',
        isShow: true,
        info: [],
        startIndex: 0,
        isLoad: false,
    }
    componentDidMount(){
        const {isLoad, startIndex, term} = this.state;
        this.handleSearch = async (term)=> {
            let regExp = /\S/;
            if(term === '' || regExp.test(term) === false) return;
            term.match(/\S/g).join('');
            this.setState({books: [],isLoad: true});
            const data = await loadService(term,startIndex);
            setTimeout(()=> {
                this.setState(state=>{
                    return {
                    books: data.items,
                    totalItem: data.totalItems,
                    isShow: true,
                    startIndex: 0,
                    isLoad: false,
                }})
            },1000);
                
        }
        this.handleLoadBooks = async ()=> {
            const data = await loadService(term,isLoad,startIndex);
            this.setState((state)=>{
                return {
                    books: state.books.concat([...data.items]),
                    startIndex: state.startIndex + 30,
                }
            });
            
        }
        
    }

    handleChange = (event)=> {
        this.setState({
            value: event.target.value,
            startIndex: 0,
        })
    }
  

    handleShowInfo = (id)=> {
            const clone = [...this.state.books];
            const book = clone.filter((elem)=> elem.id === id);
            const newObj = book[0];
            this.setState({ info: {...newObj},
            isShow: false })
    }

    closeInfo = ()=> {
        this.setState({isShow: true,})
    }

    render(){
        const {value, books, info, isShow, isLoad, totalItem} = this.state;

        if(isShow){
            return(
                <>
                <div className="container">
                <div className="header">
                    <h2>Google Book API</h2>
                </div>
                <div className="search-panel">
                <div className="search-form">
                <input type="search" value={value}
                className="form-control"
                onChange={this.handleChange}></input>
                <button className="btn btn-secondary"
                onClick={()=> this.handleSearch(value)}>Search</button>
            </div>
            <div className={(isLoad)? "loading spinner": "loading"}></div>
            
                </div>
                <BooksList books={books}
                loadMore={this.handleLoadBooks}
                showInfo={this.handleShowInfo}
                totalItem={totalItem} />
                </div>
                </>
                )
        }
            else{
                return (
                    <>
                    <div className="container">
                    <div className="search-panel">
                <div className="search-form">
                <input type="search" value={value}
                className="form-control"
                onChange={this.handleChange}></input>
                <button className="btn btn-secondary"
                onClick={()=> this.handleSearch(value)}>Search +</button>
            
            </div>
            <p>{value}</p>
                </div>    
            <ShowBook detail={info} 
            closeInfo={this.closeInfo}/> 
            </div></>
                )
            }
        
    }
}

export default Search;