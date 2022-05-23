import { useSelector } from "react-redux";
import Tier from "../Tier/Tier";
import styles from "./List.module.css";

function List() {
  const list = useSelector((state) => state.list);
  return (
    <div className={styles.list}>
      {list.slice(1, list.length).map((item, index) => {
        return (
          <Tier
            key={index}
            color={item.color}
            name={item.group}
            tierName={item.name}
            gIndex={index + 1}
            limit={list.length}
            list={item.items}
          />
        );
      })}
    </div>
  );
}
export default List;
