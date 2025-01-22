import styled from 'styled-components';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {HiEye, HiEyeSlash} from 'react-icons/hi2';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import {useUpdateUser} from './useUpdateUser';
import useUser from './useUser';
import {verifyPassword} from '../../services/apiAuth';

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

	& svg {
    outline: none;
  }

  &:hover,
  &:focus {
    color: var(--color-grey-800);
  }
`;

const UpdatePasswordForm = () => {
  const {register, handleSubmit, formState, getValues, reset} = useForm();
  const {errors} = formState;

  const {updateUser, isUpdating} = useUpdateUser();
  const {user} = useUser();

  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    password: false,
    confirmPassword: false,
  });

  async function onSubmit({currentPassword, password}) {
    // First verify current password
    const isValid = await verifyPassword({
      email: user.email,
      password: currentPassword,
    });

    console.log('Password verification:', isValid ? 'true' : 'false');

    if (!isValid) {
      toast.error('Current password is incorrect');
      return;
    }

    updateUser(
      {password},
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  }

  function handleReset(e) {
    e.preventDefault();
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Current password" error={errors?.currentPassword?.message}>
        <PasswordContainer>
          <Input
            type={passwordVisibility.currentPassword ? 'text' : 'password'}
            id="currentPassword"
            autoComplete="current-password"
            disabled={true}
            {...register('currentPassword', {
              required: 'Please enter your current password',
            })}
          />
          <StyledEyeIcon
            onClick={() =>
              setPasswordVisibility((prev) => ({
                ...prev,
                currentPassword: !prev.currentPassword,
              }))
            }
            type="button"
            className="eye-icon"
          >
            {passwordVisibility.currentPassword ? <HiEyeSlash /> : <HiEye />}
          </StyledEyeIcon>
        </PasswordContainer>
      </FormRow>
      <FormRow label="New password (min 8 symbols)" error={errors?.password?.message}>
        <PasswordContainer>
          <Input
            type={passwordVisibility.password ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            disabled={isUpdating}
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Minimum 8 symbols',
              },
            })}
          />
          <StyledEyeIcon
            onClick={() =>
              setPasswordVisibility((prev) => ({
                ...prev,
                password: !prev.password,
              }))
            }
            type="button"
            className="eye-icon"
          >
            {passwordVisibility.password ? <HiEyeSlash /> : <HiEye />}
          </StyledEyeIcon>
        </PasswordContainer>
      </FormRow>

      <FormRow label="Confirm password" error={errors?.passwordConfirm?.message}>
        <PasswordContainer>
          <Input
            type={passwordVisibility.confirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isUpdating}
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) => getValues().password === value || 'No matching',
            })}
          />
          <StyledEyeIcon
            onClick={() =>
              setPasswordVisibility((prev) => ({
                ...prev,
                confirmPassword: !prev.confirmPassword,
              }))
            }
            type="button"
            className="eye-icon"
          >
            {passwordVisibility.confirmPassword ? <HiEyeSlash /> : <HiEye />}
          </StyledEyeIcon>
        </PasswordContainer>
      </FormRow>
      <FormRow>
        <Button onClick={handleReset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
};

export default UpdatePasswordForm;
