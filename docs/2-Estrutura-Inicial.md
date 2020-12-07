# Components

Primeiramente nós iremos criar os componentes de Header, Footer, Home e seus module.css na pasta `src`.

Footer:

```javascript
import React from "react";
import styles from "./Footer.module.css";

export const Footer = () => {
  return <div className={styles.footer}>Footer</div>;
};
```

Header:

```javascript
import React from "react";
import styles from "./Header.module.css";

export const Header = () => {
  return <div className={styles.header}>Header</div>;
};
```

Criamos uma página `Home` só para mostrar nas rotas que terão no `App.js`:

```javascript
import React from "react";

export const Home = () => {
  return <div>Home</div>;
};
```

E agora no App.js iremos fazer a importação desses componentes dentro do `BrowserRoter` e teremos as rotas entre o `Header` e o `Footer`.

```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Home } from "./Pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
```

Agora nós podemos criar uma nova página de Login / Criar login, no qual como vai ser uma página específica vai ter uma pasta dentro de Components:

```javascript
import React from "react";

export const Login = () => {
  return <div>Login</div>;
};
```

Com isso, no header vamos criar um `nav` para fazer os links entre a home e o login:

```javascript
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login | Criar</Link>
      </nav>
    </div>
  );
};
```

Agora nós devemos importar lá no `App.js` a rota de login:

```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
```

## Estilização

Agora vamos no arquivo `App.css` no `src` do nosso projeto para estilizar de forma global:

```css
* {
  box-sizing: border-box;
}

body {
  padding-top: 4rem;
  margin: 0px;
  color: #333;
  --type-first: Helvetica, Arial, sans-serif;
  --type-second: "Spectral", Georgia;
  font-family: var(--type-first);
}

h1,
h2,
h3,
h4,
p {
  margin: 0px;
}

ul,
li {
  list-style: none;
  padding: 0px;
  margin: 0px;
}

img {
  display: block;
  max-width: 100%;
}

button,
input {
  display: block;
  font-size: 1rem;
  font-family: var(--type-first);
  color: #333;
}

a {
  text-decoration: none;
}

.container {
  max-width: 50rem;
  padding: 0 1rem;
  margin: 0 auto;
}
```
