import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './../Context/UserContext';
import './User.css';

const Login = props => {
  const { secureUser } = useContext(UserContext);
  const [input, setInput] = useState({});

  const handleSubmit = async evt => {
    evt.preventDefault();

    if (Object.keys(input).length > 0) {
      console.log('lol');
      try {
        const response = await axios.post(
          'http://localhost:5000/api/v1/users/login',
          {
            email: input.email[0],
            password: input.password[0]
          }
        );
        console.log(response.data);
        localStorage.setItem('quiziToken', response.data.token);
        secureUser(true);
        props.history.push('/profile');
      } catch (error) {
        //console.log(error);
      }
    }
  };

  const handleChange = evt => {
    setInput({ ...input, [evt.target.id]: [evt.target.value] });
  };
  return (
    <div className="container center">
      <h3>Login</h3>
      <div className="row" style={{ marginTop: '25px' }}>
        <form
          className="col l12 s12"
          onSubmit={handleSubmit}
          style={{
            background: '#fff',
            borderRadius: '2px',
            boxShadow:
              '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
            padding: '25px 25px 25px 15px '
          }}
        >
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="email"
                type="email"
                className="validate inputWidth"
                required
                onChange={handleChange}
              />
              <label htmlFor="email">Email Address</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">vpn_key</i>
              <input
                id="password"
                type="password"
                minLength="8"
                className="validate"
                required
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row center">
            <div className="input-field">
              <button
                className="btn waves-effect indigo btn-large"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
