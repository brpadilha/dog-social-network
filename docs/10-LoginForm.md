# LoginForm

Agora nós iremos adicionar mais informações no loginForm, primeiramente vamos colocar ele um animação de animateLeft e criar essa animação no `App.css`:

Coloca animateLeft em toda a section:

```javascript
<section className="animeLeft">
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
```

Agora no App.css:

```javascript
.animeLeft {
  opacity: 0;
  transform: translateX(-20px);
  animation: animeLeft .3s forwards;
}

@keyframes animeLeft{
  to{
    opacity: 1;
    transform: initial;
  }
}
```

Agora podemos ver que faz uma entradinha de leve da esquerda para direita.
Nós agora iremos estilizar o title de todo h1 da nossa aplicação:

```javascript
.title {
  font-family: var(--type-second);
  line-height: 1;
  font-size: 3rem;
  margin: 1rem 0;
  position: relative;
  z-index: 1;
}


.title::after{
  content: "";
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #fb1;
  position: absolute;
  bottom: 5px;
  left: -5px;
  border-radius: 0.2rem;
  z-index: -1;
}

```

Também devemos importar no começo do nosso App.css o font family Spectral do google fonts:

```javascript
@import url('https://fonts.googleapis.com/css2?family=Spectral:wght@700&display=swap');

```

Agora nós vamos criar um componente para o Error, para isso vamos criar uma pasta Helper e componetizar o Error la dentro:

```javascript
import React from "react";

function Error({ error }) {
  if (!error) return null;
  return <p style={{ color: "#f31", margin: "1rem 0" }}>{error}</p>;
}

export default Error;
```

Agora nós importamos esse componente de erro dentro do loginForm:

```javascript
<Error error={error} />
```

Agora nós vamos adicionar mais botões na nossa tela, para quando perdeu senha, criar conta e colocar os estilos neles:

```javascript
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
import { UserContext } from "../../Hooks/UserContext";
import { Button } from "../Forms/Button";
import { Input } from "../Forms/Input";
import Error from "../Helper/Error";
import styles from "./LoginForm.module.css";

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
      Login Form
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a Senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={styles.buttonCriar} to="/login/criar">
          Cadastro
        </Link>
      </div>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};
```

Agora vamos estilizar os mesmos:
`LoginForm.module.css`

```javascript
.form{
  margin-bottom: 2rem;
}

.perdeu{
 display: inline-block;
 color: #666;
 padding: 0.5rem 0;
 line-height: 1;
}

.perdeu::after{
  content: '';
  height: 2px;
  width: 100%;
  background: currentColor;
  display: block;
}

.cadastro{
  margin-top: 4rem;
}

.cadastro p {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.subtitle{
  font-family: var(--type-second);
  line-height: 1;
  font-size: 2rem;
}

.subtitle::after{
  content: '';
  display: block;
  background: #ddd;
  height: 0.5rem;
  width: 3rem;
  border-radius: 0.2rem;
}
```

Agora nós queremos colocar o estilo do button em um link, para isso vamos importar o style do component button com outro nome:

Ficando assim nosso LoginForm:

```javascript
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
```
