import React, { useState, useEffect } from "react";
import UserHeaderNav from "./UserHeaderNav";
import styles from "./UserHeader.module.css";
import { useLocation } from "react-router-dom";

export default function UserHeader() {
  const [title, setTitle] = useState("");
  const location = useLocation().pathname;

  useEffect(() => {
    switch (location) {
      case "/conta/postar":
        setTitle("Adicionar fotos");
        break;
      case "/conta/estatisticas":
        setTitle("Estatísticas");
        break;
      default:
        setTitle("Minhas fotos");
        break;
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
}
