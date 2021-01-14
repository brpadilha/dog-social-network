import React from "react";
import { PHOTO_DELETE } from "../../api";
import { useFetch } from "../../Hooks/useFetch";
import styles from "./PhotoDelete.module.css";

export default function PhotoDelete({ id }) {
  const token = window.localStorage.getItem("token");
  const { loading, request } = useFetch();

  async function handleDelete() {
    const confirm = window.confirm("Tem certeza que deseja deletar?");
    if (confirm) {
      const { url, options } = PHOTO_DELETE(id, token);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  }

  return (
    <>
      {loading ? (
        <button className={styles.delete} onClick={handleDelete} disabled>
          Deletar
        </button>
      ) : (
        <button className={styles.delete} onClick={handleDelete}>
          Deletar
        </button>
      )}
    </>
  );
}
