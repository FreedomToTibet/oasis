import styled from 'styled-components';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {HiEye, HiEyeSlash} from 'react-icons/hi2';

import {useSignup} from './useSignup';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

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

const SignupForm = () => {
  const {signup, isLoading} = useSignup();
  const {register, formState, getValues, handleSubmit, reset} = useForm();
  const {errors} = formState;
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [passwordVisibility, setPasswordVisibility] = useState({
		password: false,
		confirmPassword: false
	});

  const onSubmit = ({fullName, email, password}) => {
    signup(
      {fullName, email, password},
      {
        onSettled: () => reset(),
      },
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register('fullName', {required: 'This field is required'})}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <PasswordContainer>
          <Input
            type={passwordVisibility.password ? 'text' : 'password'}
            id="password"
            disabled={isLoading}
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Needs at least 8 symbols long',
              },
            })}
          />
          <StyledEyeIcon
            onClick={() => setPasswordVisibility(prev => ({
							...prev,
							password: !prev.password
						}))}
            type="button"
            className="eye-icon"
          >
            {passwordVisibility.password ? <HiEyeSlash /> : <HiEye />}
          </StyledEyeIcon>
        </PasswordContainer>
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <PasswordContainer>
          <Input
            type={passwordVisibility.confirmPassword ? 'text' : 'password'}
            id="passwordConfirm"
            disabled={isLoading}
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) =>
                value === getValues().password || "Passwords doesn't match",
            })}
          />
          <StyledEyeIcon
            onClick={() => setPasswordVisibility(prev => ({
							...prev,
							confirmPassword: !prev.confirmPassword
						}))} 
            type="button"
            className="eye-icon"
          >
            {passwordVisibility.confirmPassword ? <HiEyeSlash /> : <HiEye />}
          </StyledEyeIcon>
        </PasswordContainer>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isLoading} onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create user</Button>
      </FormRow>
    </Form>
  );
};

export default SignupForm;
