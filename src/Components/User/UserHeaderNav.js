import React, { useContext, useState,useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../Hooks/UserContext";
import { ReactComponent as MinhasFotos } from "../../Assets/feed.svg";
import { ReactComponent as Adicionar } from "../../Assets/adicionar.svg";
import { ReactComponent as Estatisticas } from "../../Assets/estatisticas.svg";
import { ReactComponent as Sair } from "../../Assets/sair.svg";
import styles from "./UserHeaderNav.module.css";
import useMedia from "../../Hooks/useMedia";

export default function UserHeaderNav() {
  const { userLogout } = useContext(UserContext);
  const mobile = useMedia("(max-width: 40rem)")
  const [mobileMenu, setMobileMenu] = useState(false)

  const {pathname} = useLocation()

  useEffect(() => {
    setMobileMenu(false)
  }, [pathname])

  return (
    <>
      {
        mobile && <button aria-label="Menu" className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`} onClick={()=>setMobileMenu(!mobileMenu)}></button>
      }

      <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
        <NavLink to="/conta" end activeClassName={styles.active}>
          <MinhasFotos />
          {mobile && "Minhas fotos"}
        </NavLink>
        <NavLink to="/conta/postar" activeClassName={styles.active}>
          <Adicionar />
          {mobile && "Adicionar Foto"}
        </NavLink>
        <NavLink to="/conta/estatisticas" activeClassName={styles.active}>
          <Estatisticas />
          {mobile && "Estatísticas"}
        </NavLink>
        <button onClick={userLogout}>
          {mobile && "Sair"}
          <Sair />
        </button>
      </nav>
    </>
  );
}
