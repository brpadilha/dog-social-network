# Routes Login

Agora dentro `/login` teremos 3 rotas dentro dele, que será o de criar login, perdeu a senha e resetar senha, iremos estar criando estes 3 componentes:

```javascript
import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { LoginCreate } from "./LoginCreate";
import { LoginPasswordLost } from "./LoginPasswordLost";
import { LoginPasswordReset } from "./LoginPasswordReset";

export const Login = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="criar" element={<LoginCreate />} />
        <Route path="perdeu" element={<LoginPasswordLost />} />
        <Route path="resetar" element={<LoginPasswordReset />} />
      </Routes>
    </div>
  );
};
```

Como nós teremos sub-rotas, no `App.js` temos que passar as subrotas no login com um `/login/*` no path:

```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login/*" element={<Login />} />
</Routes>
```

Agora nós vamos fazer a nossa página do LoginForm:

```javascript
import { useState } from "react";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      Login Form
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};
```

Agora vamos criar o handleSubmit para fazer a requisição de login:

```javascript
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
```
