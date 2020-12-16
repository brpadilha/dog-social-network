import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
import { UserContext } from "../../Hooks/UserContext";
import { Button } from "../Forms/Button";
import { Input } from "../Forms/Input";
import Error from "../Helper/Error";
import styles from "./LoginForm.module.css";
import styleButton from "../Forms/Button.module.css";

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
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button type="submit">Entrar</Button>
        )}
        <Error error={error} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a Senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={styleButton.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};
