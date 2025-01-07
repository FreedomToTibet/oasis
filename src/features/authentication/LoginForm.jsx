import { useState } from "react";

import useLogin from "./useLogin";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";


const LoginForm = () => {
  const [email, setEmail] = useState("redwine@wine.org");
  const [password, setPassword] = useState("wine2585");
	const { login, isLoading } = useLogin();

  function handleSubmit(event) {
		event.preventDefault();
		if (!email || !password) return;

		login({ email, password });
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
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
					disabled={isLoading}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button size="large" disabled={isLoading} >
					{ !isLoading ? "Login" : <SpinnerMini /> }
				</Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
