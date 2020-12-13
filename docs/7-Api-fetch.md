# API FETCH

Agora nós iremos desestruturar nosso fetch, criando uma função que vai retornar a url que iremos receber e as options para fazer o fetch. Com isso criamos na raíz o arquivo `api.js` e lá iremos fazer as funções de GET do usuário e de POST para a requisição de login:

```javascript
export const API_URL = "https://dogsapi.origamid.dev/json";

export function TOKEN_POST(body) {
  return {
    url: API_URL + "/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_GET(token) {
  return {
    url: API_URL + "/api/user",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer" + token,
      },
    },
  };
}
```

Agora podemos usar essas funções dentro do `LoginForm`:

```javascript
async function getUser(token) {
  const { url, options } = USER_GET(token);

  const response = await (await fetch(url, options)).json();
  console.log(response);
}

async function handleSubmit(event) {
  event.preventDefault();

  if (username.validate() && password.validate()) {
    const { url, options } = TOKEN_POST({
      username: username.value,
      password: password.value,
    });

    const response = await (await fetch(url, options)).json();
    window.localStorage.setItem("token", response.token);
    getUser(response.token);
  }
}
```

Agora nós iremos fazer um efeito de que se um usuário já estiver logado (verificar no localstorage) ele vai pegar os dados:

```javascript
useEffect(() => {
  const token = window.localStorage.getItem("token");

  if (token) {
    getUser(token);
  }
}, []);
```
