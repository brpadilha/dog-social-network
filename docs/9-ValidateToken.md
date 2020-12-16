# Validate Token

Agora nós iremos lidar com validação de token:

Para isso vamos criar um useEffect que vai validar o token no `UserContext`:

```javascript
useEffect(() => {
  async function autoLogin() {
    const token = window.localStorage.getItem("token");
    if (token) {
      try {
        setError(null);
        setLoading(true);
        const { url, options } = TOKEN_VALIDATE_POST(token);
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Token inválido");
        await getUser(token);
        navigate("/conta");
      } catch (error) {
        userLogout();
      } finally {
        setLoading(false);
      }
    }
  }
  autoLogin();
}, [navigate, userLogout]);
```

Agora vamos criar a função de dar logout no usuário:

```javascript
const userLogout = useCallback(
  async function userLogout() {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem("token");
    navigate("/login");
  },
  [navigate]
);
```

E podemos agora também melhorar a função do login para que mostre mensagem de erro caso o cara passe a o login e senha errado:

```javascript
async function userLogin(username, password) {
  try {
    setError(null);
    setLoading(true);
    const { url, options } = TOKEN_POST({ username, password });

    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Error ao logar, confira email ou senha`);
    const { token } = response.json();
    window.localStorage.setItem("token", token);
    getUser(token);
  } catch (err) {
    setError(err.message);
    setLogin(false);
  } finally {
    setLoading(false);
  }
}
```

Agora nós podemos passar todas as informações de erro, loading etc no value lá embaixo:

```javascript
{
  return (
    <UserContext.Provider
      value={{ userLogin, data, userLogout, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
}
```

E agora no LoginForm podemos ter acesso a todas esses valores e passar a informação na tela, caso esteja logando o botão vai virar um Carregando..., mostrar mensagem de erro, etc:

```javascript
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
```

Agora nós iremos criar no header um button de Sair, caso o usuário esteja logado:

```javascript
export const Header = () => {
  const { data, userLogout } = useContext(UserContext);

  return (
    <div className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        {data ? (
          <Link className={styles.login} to="/conta">
            {data.nome}
            <button onClick={userLogout}>Sair</button>
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

Agora nós iremos fazer uma mudança caso o usuário logue, que mude a rota para logado, para isso, iremos utilizar a função do useNavigate do react-router-dom, nas funções que ele logar usar `navigate("/conta");` e quando for deslogar `navigate("/login");`. Para que redirecione quando o usuário estiver logado, lá no arquivo `Login.js` nós podemos receber o UserContext login e verificar se está logado, se estiver, redirecionar para conta:

```javascript
import { useContext } from "react";
import { UserContext } from "../../Hooks/UserContext";

export const Login = () => {
  const { login } = useContext(UserContext);

  if (login === true) return <Navigate to="/conta" />;

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
