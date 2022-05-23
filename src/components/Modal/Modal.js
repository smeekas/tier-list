import React from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import styles from "./Modal.module.css";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
function Modal({ setShowModal, index, defaultColor, limit }) {
  const disaptch = useDispatch();
  return createPortal(
    <div className={styles.backdrop}>
      <motion.div
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
        }}
        transition={{ duration: 0.3 }}
        className={styles.modal}
      >
        <section className={styles.navbar}>
          <MdClose
            className={styles.closeButton}
            onClick={setShowModal.bind(null, false)}
          />
        </section>
        <section className={styles.colorPickerSection}>
          <div>
            <span className={`${styles.text}`}>select color :</span>{" "}
            <input
              onBlur={(e) => {
                disaptch({
                  type: "COLOR_CHANGE",
                  gIndex: index,
                  color: e.target.value,
                });
              }}
              defaultValue={`#${defaultColor}`}
              className={styles.colorPicker}
              type="color"
            />
          </div>
        </section>
        <section className={styles.editText}>
          <div className={styles.text}>Edit label text : </div>
          <input
            type="text"
            onBlur={(e) => {
              if (e.target.value.trim().length !== 0) {
                disaptch({
                  type: "NAME_CHANGE",
                  gIndex: index,
                  text: e.target.value,
                });
              }
            }}
            className={styles.labelText}
          />
        </section>
        <section className={styles.buttons}>
          <button
            type="button"
            onClick={() => {
              disaptch({ type: "CLEAR_ROW", gIndex: index });
            }}
          >
            Clear Row Images
          </button>
          <button
            disabled={limit === 2 ? true : false}
            type="button"
            onClick={() => {
              disaptch({ type: "DELETE_ROW", gIndex: index });
              setShowModal(false);
            }}
          >
            Delete Row
          </button>
          <button
            type="button"
            onClick={() => {
              disaptch({ type: "ADD_ROW", where: "below", gIndex: index });
            }}
          >
            Add a Row Below
          </button>
          <button
            type="button"
            onClick={() => {
              disaptch({ type: "ADD_ROW", where: "above", gIndex: index });
            }}
          >
            Add a Row Above
          </button>
        </section>
      </motion.div>
    </div>,
    document.getElementById("backdrop")
  );
}
export default Modal;
