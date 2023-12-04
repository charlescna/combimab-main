import React, { useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';

const HCPRegisteration = ()=> {
  return (<h1>Welcome</h1>

  );
}
export default HCPRegisteration;




export function UserList( {users, setUsers} ) {
  // Check if there is a query parameter "token", and if there is, store it in local storage
  const [searchParams, setSearchParams] = useSearchParams();
  const oauthToken = searchParams.get('token');
  if (oauthToken) {
      localStorage.setItem('token', oauthToken);
      searchParams.delete('token');
      setSearchParams(searchParams);
    }

    useEffect( () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch("/api/users", requestOptions)
      .then(
          
          response =>  {
              if( !response.ok) {
                  let code = response.status.toString();
                  throw new Error( `${code} ${response.statusText}`);
              }
              return response.json();

      })
        .then(users => setUsers(users))
        .catch( e => {
            console.log("Error!!!");
            console.log(e.message);
            localStorage.clear();
            return (<Navigate to="/loginPage" replace={true} />)    
        });
        
      }, [])
    
      const token = localStorage.getItem('token');


      if( !token) {
          return (<Navigate to="/InfusionSpecification" replace={true} />)
          
      }
      else {
          
            if( users == null ) return;
          
        
            return (
                <div>
                  <h1>HCPRegisteration Form</h1>
                  {users.map((user, i) => {
                    return <Users name={user.name} users={users} setUsers={setUsers}/> 
                })}
                  
                </div>
              
              )
        }
    }

    function Users( {name, users, setUsers} ) {


        return (
            <div>
              
                <p>Welcome,{name}</p>
                
                <button onClick={ () => {
                
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
                    var urlencoded = new URLSearchParams();
                    urlencoded.append("FirstName", name);
    
                    var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: urlencoded,
                    redirect: 'follow'
                    };
    
                    fetch("/api/removeUser", requestOptions)
                    .then(response => response.json())
                    .then( setUsers )

                    .catch(error => console.log('error', error));
                } }>Remove</button>
            </div>
            
        );
    } 
