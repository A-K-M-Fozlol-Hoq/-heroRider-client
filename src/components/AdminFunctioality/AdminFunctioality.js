import React, { useState } from 'react';

const AdminFunctioality = () => {
    const [deleteUsers, setDeleteUsers] = useState(false);
    const[currentPage, setCurrentPage] = useState(0)
    const [haveToDeleteUsersList, setHaveToDeleteUsersList] = useState([])
    const [query, setQuery] = useState({
        minAge:'',
        maxAge:'',
        searchParam:''
    })
    const [results, setResults] = useState([]);
    const loadUsersFromDB=(currentPageToLoad)=>{
        if( query.searchParam){
            console.log( query);
            // query, minAge, maxAge,pageNumber
            fetch('https://cryptic-ravine-92718.herokuapp.com/getUsersBySearch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query:query.searchParam,
                minAge:parseInt(query.minAge),
                maxAge:parseInt(query.maxAge),
                pageNumber:currentPageToLoad
            })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setResults(data)
            })
            .catch(err => console.log(err))

        }else{
            alert('Please write your query')
        }
    }
    const andOrRemoveToDeleteUsers = (id) => {
        let notAddedTillNow = true;
        haveToDeleteUsersList.map((userId) => {
            if(userId === id){
                notAddedTillNow=false;
            }
        })
        if(notAddedTillNow){
            setHaveToDeleteUsersList([...haveToDeleteUsersList, id])
        }else{
            const newArray =haveToDeleteUsersList.filter(userID => userID !== id);
            setHaveToDeleteUsersList(newArray)
        }
    }
    const deleteUsersHandler=() => {
        if(haveToDeleteUsersList.length>0){
            fetch('https://cryptic-ravine-92718.herokuapp.com/deleteSelectedUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                haveToDeleteUsersList:haveToDeleteUsersList
            })
            })
            .then(res => res.json())
            .then(data => {
                // console.log(haveToDeleteUsersList)
                console.log(data)
                if(data.success) {
                    alert('deleted users successfully!')
                    window.location.reload();
                }
                // window.location.reload();
            })
            .catch(err => console.log(err))
        }else{
            alert("No user selected")
        }
    }
    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col-md-6 p-5 m-5 mx-auto bg-primary rounded">
                    <p style={{marginBottom:'0px', color:'#fff'}}>search by name or email or phone:</p>
                    {/* <select className='form-control w-25 mb-2' name="searchBy" id="searchBy"  onChange={(e) => setSearchBy( e.target.value)}>
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                    </select> */}
                    <input className='form-control mb-2' type="text" name="" id="" placeholder="search by name or email or phone"
                            onChange={(e) => setQuery( {...query, searchParam:e.target.value})}/>
                    {/* {
                        searchBy === 'name' &&
                        <input className='form-control mb-2' type="text" name="" id="" placeholder="search by name or email or phone"
                            onChange={(e) => setQuery( {...query, searchParam:e.target.value})}/>
                    }
                    {
                        searchBy === 'email' &&
                        <input className='form-control mb-2' type="email" name="" id="" placeholder="search by email"
                        onChange={(e) => setQuery( {...query, searchParam:e.target.value})} />
                    }
                    {
                        searchBy === 'phone' &&
                        <input className='form-control mb-2' type="string" name="" id="" placeholder="search by phone"
                        onChange={(e) => setQuery( {...query, searchParam:e.target.value})} />
                    } */}
                    <div className="row">
                        <p className="text-center bg-secondary p-2 rounded">sort by ages(optional)</p>
                        <div className="col-md-6">
                            <input className='form-control'type="number" name="" id="" min="0" max="210"placeholder="min age"
                            onChange={(e) => setQuery( {...query, minAge:e.target.value})} />
                        </div>
                        <div className="col-md-6">
                            <input className='form-control'type="number" name="" id="" min="0" max="210"placeholder="max age"
                            onChange={(e) => setQuery( {...query, maxAge:e.target.value})} />
                        </div>
                    </div>
                    <div className="btn btn-info mt-2 w-25" onClick={()=>loadUsersFromDB(currentPage)}>Search</div>
                    </div>
                </div>
            <div>
        </div>
        <div className='bg-secondary mb-2 p-2 rounded row'>
            <select className='form-control w-25 mb-2' name="searchBy" id="searchBy"  onChange={(e) => setDeleteUsers(!deleteUsers)}>
                <option value="">Bulk options</option>
                <option value="delete">Delete</option>
            </select>
            {
                deleteUsers ?
                <div className='btn btn-danger mx-5 w-25' onClick={deleteUsersHandler}>Confirm Delete</div>
                :
                <p className='bg-info rounded mx-5 w-25'>Change bulk option to 'delete' mode to delete selected users</p>
            }
        </div>
        {/* table part */}
        <div className='bg-secondary m-2 p-2 rounded text-center'>
            <div className='bg-danger m-2 p-2 rounded' style={{display:'grid', gridTemplateColumns:'40px 1fr 2fr', gridGap:'20px'}}>
                <div>Select</div>
                <div>Name</div>
                <div>Email</div>
            </div>
            {
                results.map((result,index) =>
                <div key={index} className='bg-info m-2 p-2 rounded' style={{display:'grid', gridTemplateColumns:'20px 1fr 2fr', gridGap:'20px'}}>
                    <input onChange={()=>{andOrRemoveToDeleteUsers(result.email)}} className='mt-2' type="checkbox" name="" id="" />
                    <div>{result.fullName}</div>
                    <div>{result.email}</div>
                </div>)
            }
            <div className="bg-secondary">
                {currentPage>0 && <div onClick={()=>{setCurrentPage(currentPage-1); loadUsersFromDB(currentPage-1)}} className="btn mx-1 btn-info">Prev</div>}
                <div className="btn mx-1 btn-info">{currentPage+1}</div>
                {results.length===10 && <div onClick={()=>{setCurrentPage(currentPage+1); loadUsersFromDB(currentPage+1)}} className="btn mx-1 btn-info">Next</div>}
            </div>
        </div>
    </div>
    );
};

export default AdminFunctioality;