import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Forms/Button";
import { Input } from "../Forms/Input";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    fetch("https://dogsapi.origamid.dev/json/jwt-auth/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => console.log(json));
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name={username} />
        <Input label="Senha" type="password" name={password} />
        <Button type="submit">Entrar</Button>
        <Button disabled>Entrar</Button>
      </form>
      Login Form
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};
