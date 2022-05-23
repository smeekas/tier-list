import styles from "./Settings.module.css";
import { FiSettings, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Modal from "../Modal/Modal";
function Settings({ index, limit, defaultColor }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const upHandler = () => {
    dispatch({ type: "UP_INDEX", index: index });
  };
  const downHandler = () => {
    dispatch({ type: "DOWN_INDEX", index: index });
  };
  const settingHandler = (bool) => {
    setShowModal(bool);
  };
  return (
    <div className={styles.settings}>
      {showModal && (
        <Modal
          defaultColor={defaultColor}
          setShowModal={setShowModal}
          index={index}
          limit={limit}
        />
      )}
      <div
        onClick={settingHandler.bind(null, true)}
        className={`${styles.icon} ${styles.center}`}
      >
        <FiSettings />
      </div>
      <div className={styles.arrows}>
        <section
          style={{ cursor: index !== 1 ? "pointer" : "not-allowed" }}
          onClick={index !== 1 ? upHandler : null}
          className={`${styles.center} ${styles.icon}`}
        >
          <FiChevronUp />
        </section>
        <section
          style={{ cursor: index !== limit - 1 ? "pointer" : "not-allowed" }}
          onClick={index !== limit - 1 ? downHandler : null}
          className={`${styles.center} ${styles.icon}`}
        >
          <FiChevronDown />
        </section>
      </div>
    </div>
  );
}
export default Settings;
