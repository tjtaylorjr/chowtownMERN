import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '../context/Modal';

const AuthForm = (props) => {
  const defaultUserState = {
    name: "",
    id: "",
  };

  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(defaultUserState);

  const history = useHistory();
  const { flag } = props;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.mockLogin(user);
    history.push('/');
  };

  return (
    <>
      <button
        type="button"
        className="auth__button"
        onClick={() => setShowModal(true)}
      >
        {flag}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="login-form__container">
            <form className="login-form" onSubmit={handleSubmit}>
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
              <button type="submit">
                {flag}
              </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  )
}

export default AuthForm;
