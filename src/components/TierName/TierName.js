import styles from "./TierName.module.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import tierActionTypes from "../../actionTypes/tierActionTypes";
const TierName = ({ name, color, gIndex, tierName }) => {
  const dispatch = useDispatch();
  const divRef = useRef();
  const blurHandler = (e) => {
    dispatch({
      type: tierActionTypes.NAME_CHANGE,
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
      onKeyDown={(e) => {}}
    >
      <span>{tierName}</span>
    </div>
  );
};
export default TierName;
