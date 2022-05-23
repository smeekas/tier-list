import styles from "./Tier.module.css";
import TierName from "../TierName/TierName";
import ImageArea from "../ImageArea/ImageArea";
import Settings from "../Settings/Settings";
function Tier({ name, list, color, gIndex, limit, tierName }) {
  return (
    <div className={styles.tier}>
      <TierName gIndex={gIndex} tierName={tierName} color={color} />
      <ImageArea name={name} list={list} />
      <div className={styles.settings}>
        <Settings defaultColor={color} index={gIndex} limit={limit} />
      </div>
    </div>
  );
}
export default Tier;
