import styles from "./TierName.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
const TierName = ({ name, color, gIndex, tierName }) => {
  const dispatch = useDispatch();
  const divRef = useRef();
  const blurHandler = (e) => {
    dispatch({
      type: "NAME_CHANGE",
      text: e.target.innerText,
      gIndex: gIndex,
    });
  };

  return (
    <div
      ref={divRef}
      style={{ backgroundColor: `#${color}` }}
      className={styles.tierName}
      tabIndex="11"
      onBlur={(e) => {
        blurHandler(e);
      }}
      contentEditable="true"
      suppressContentEditableWarning={true}
      onKeyDown={(e) => {
        // inputHandler(e);
      }}
    >
      <span>{tierName}</span>
      {/* {tierName} */}
    </div>
  );
};
export default TierName;
