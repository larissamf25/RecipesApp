import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);

  const history = useHistory();

  const saveLocalStore = (key, data) => localStorage
    .setItem(key, JSON.stringify(data));

  const handleSubmitBtn = (e) => {
    saveLocalStore('mealsToken', 1);
    saveLocalStore('cocktailsToken', 1);
    saveLocalStore('user', { email });
    e.preventDefault();
    history.push('/foods');
  };

  const passwordMinLength = 6;
  const passwordVerification = () => password.length > passwordMinLength;

  const emailVerification = () => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleChange = ({ target: { value, name } }) => (
    name === 'email'
      ? setEmail(value)
      : setPassword(value)
  );

  useEffect(() => {
    const validation = emailVerification() && passwordVerification();
    if (validation) setDisabledBtn(false);
    else setDisabledBtn(true);
  }, [email, password]);

  return (
    <div>
      <input
        type="text"
        data-testid="email-input"
        placeholder="email"
        name="email"
        onChange={ handleChange }
        value={ email }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="password"
        name="password"
        onChange={ handleChange }
        value={ password }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        placeholder="email"
        disabled={ disabledBtn }
        onClick={ handleSubmitBtn }
      >
        login
      </button>
    </div>
  );
}

export default Login;
