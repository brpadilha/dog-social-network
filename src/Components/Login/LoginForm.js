import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
import { UserContext } from "../../Hooks/UserContext";
import { Button } from "../Forms/Button";
import { Input } from "../Forms/Input";

export const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin, error, loading } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      await userLogin(username.value, password.value);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button type="submit">Entrar</Button>
        )}
        {error && <p>{error}</p>}
      </form>
      Login Form
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};
