
let url = 'https://www.googleapis.com/books/v1/volumes?q=';
const loadService = async (term,index)=>{
    let res = await fetch(`${url+term}&startIndex=${index}&maxResults=30`);
    if(!res.ok){
        throw new Error('Could not fetch '+ url + ', status: ' + res.status );
    }
    return await res.json();
}

export default loadService;