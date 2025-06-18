import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  aberto: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ aberto, onClose, children }) => {
  if (!aberto) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.btnFechar} onClick={onClose} title="Fechar">×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
