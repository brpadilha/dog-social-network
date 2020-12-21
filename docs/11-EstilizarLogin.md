# Login Background

Agora nós iremos estilizar a página de login. Primeiramente nós criamos uma section o classname de styles.login e uma div dentro dela de styles.forms, agora estilizamos ela:

`Login.js`

```javascript
return (
  <section className={styles.login}>
    <div className={styles.forms}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="criar" element={<LoginCreate />} />
        <Route path="perdeu" element={<LoginPasswordLost />} />
        <Route path="resetar" element={<LoginPasswordReset />} />
      </Routes>
    </div>
  </section>
);
```

`Login.module.css`

```css
.login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  gap: 2rem;
}
/* para imagem ficar antes do login */
.login::before {
  display: block;
  content: "";
  background: url("../../Assets//login.jpg") no-repeat center center;
  background-size: cover;
}

.forms {
  max-width: 30rem;
  padding: 1rem;
}

/* Para adicionar responsividade para quando o dispositivo tem no máximo 40rem */

@media (max-width: 40rem) {
  .login {
    grid-template-columns: 1fr;
  }

  .login::before {
    display: none;
  }

  .forms {
    max-width: 100%;
  }
}
```
