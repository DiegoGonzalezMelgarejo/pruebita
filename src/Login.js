import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import './index.css';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:8000/api/login', { username: username.value, password: password.value })
    .then(response => {
      setLoading(false);
      axios.defaults.headers.common['Authorization']='Bearer '+ response.data.token
      localStorage.setItem('token',response.data.token)

      axios.post('http://localhost:8000/api/user').then(res=>{

      console.log("puta",res)
        setUserSession(localStorage.getItem('token'), res.data.user);
        props.history.push('/dashboard');
        window.location.reload(true);
      }).catch(error => {
        
        setLoading(false);
        
         setError("Error de credenciales");
      
      });
    }).catch(err => {
   

      setLoading(false);
     
     setError("Error con las credenciales para ingresar al sistema.Contactar administrador");
    
    });
  }

  return (
    
    <div id="login">
    <style>
      
    </style>
       <div >
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-8">
                        <div id="login-box" className="col-md-12">
                            <form id="login-form" className="form" >
                                <h3 className="text-center text-info">Login</h3>
                                <div className="form-group">
                                    <label for="username" className="text-info">Username:</label><br/>
                                    <input type="text" name="username" id="username" className="form-control"
                                   {...username}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="password" className="text-info">Password:</label><br/>
                                    <input type="password" name="password" id="password" className="form-control"
                                   {...password}
                                    />
                                </div>
                                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                                <div className="form-group">
                                    <input type="submit"value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}   name="submit" className="btn btn-info btn-md" value="submit"/>
                                </div>
                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;