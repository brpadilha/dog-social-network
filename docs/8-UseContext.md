# UseContext

Agora nós devemos usar o useContext para poder ter acesso aos dados do usuário logado em todas as rotas.

Primeiramente iremos criar um arquivo de `UserContext` dentro dos hooks:

```javascript
import React, { createContext } from "react";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  return (
    <UserContext.Provider value={{ usuario: "Bruno" }}>
      {children}
    </UserContext.Provider>
  );
};
```

Agora nós importamos ele no `App.js` e envolvemos todas as rotas entre o `BroserRouter`:

```javascript
<BrowserRouter>
  <UserStorage>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/*" element={<Login />} />
    </Routes>
    <Footer />
  </UserStorage>
</BrowserRouter>
```

Agora podemos teremos acesso ao value do usuário Bruno em todas as rotas, só importar a função useContext e o UserContext que criamos em alguma rota.
Com isso, nós iremos criar toda a fase de login e logout do usuário no context:

```javascript
import React, { createContext, useState } from "react";
import { TOKEN_POST, USER_GET } from "../api";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await (await fetch(url, options)).json();
    setData(response);
    setLogin(true);
    console.log(response);
  }

  async function userLogin(username, password) {
    const { url, options } = TOKEN_POST({ username, password });

    const { token } = await (await fetch(url, options)).json();
    window.localStorage.setItem("token", token);
    getUser(token);
  }

  return (
    <UserContext.Provider value={{ userLogin, data }}>
      {children}
    </UserContext.Provider>
  );
};
```

E agora podemos utilizar essa função de login no nosso `LoginForm`:

```javascript
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
import { UserContext } from "../../Hooks/UserContext";
import { Button } from "../Forms/Button";
import { Input } from "../Forms/Input";

export const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin } = useContext(UserContext);

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
        <Button type="submit">Entrar</Button>
      </form>
      Login Form
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};
```

Agora vamos utilizar o `data` do useContext no nosso header, para exibir as informações do usuário logado, onde caso exista o data, ele vai ter um link com o nome do usuário para uma página da contna:

```javascript
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { ReactComponent as Dogs } from "../Assets/dogs.svg";
import { UserContext } from "../Hooks/UserContext";

export const Header = () => {
  const { data } = useContext(UserContext);

  return (
    <div className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        {data ? (
          <Link className={styles.login} to="/conta">
            {data.nome}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login | Criar
          </Link>
        )}
      </nav>
    </div>
  );
};
```
