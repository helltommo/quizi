import React, { useState, createContext } from 'react';
export const UserContext = createContext();

export function UserProvider(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState();
  const [points, setPoints] = useState(null);
  const [curName, setCurName] = useState();




  const secureUser = bool => {
    setIsAuth(bool);
  };

  const userData = userData => {
    setUser(userData)
  }

  const handlePoints = () =>{
    // const points = ans === props.calculate;
    // setpoints(getpoints + points);
    if (points === null) {
        setPoints(1)
      } else{
        setPoints(points + 1)
      }
  
}


const handleCurName = (value) =>{
  setCurName(value);
}





  return (
    <UserContext.Provider value={{ isAuth, secureUser, userData, user , handlePoints, handleCurName }}>
      {props.children}
    </UserContext.Provider>
  );
}
