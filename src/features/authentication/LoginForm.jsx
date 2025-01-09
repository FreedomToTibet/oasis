import styled from 'styled-components';
import {useState} from 'react';
import {HiEye, HiEyeSlash} from 'react-icons/hi2';

import useLogin from './useLogin';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledEyeIcon = styled.button`
  position: absolute;
  right: 2rem;
  top: 30%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--color-grey-500);
  font-size: 1.8rem;
	outline: none;

  &:hover,
	&:focus {
    color: var(--color-grey-800);
  }
`;

const LoginForm = () => {
  const [email, setEmail] = useState('redwine@wine.org');
  const [password, setPassword] = useState('wine2585');
  const {login, isLoading} = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) return;

    login({email, password});
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
       <PasswordContainer>
          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <StyledEyeIcon onClick={() => setShowPassword((show) => !show)} type="button">
            {showPassword ? <HiEyeSlash /> : <HiEye />}
          </StyledEyeIcon>
        </PasswordContainer>
      </FormRow>
      <FormRow orientation="vertical">
        <Button size="large" disabled={isLoading}>
          {!isLoading ? 'Login' : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
};

export default LoginForm;
