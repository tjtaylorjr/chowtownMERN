import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props) => {

  const defaultUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(defaultUserState);

  const history = useHistory();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user);
    history.push('/');
  }

  return (
    <div className="login">
      <div>
        <div>
          <label htmlFor="user">Username</label>
          <input
            type="text"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>
        <div>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>
        <button onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
