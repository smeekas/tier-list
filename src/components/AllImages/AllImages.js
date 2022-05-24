import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AllImages.module.css";
import tierActionTypes from "../../actionTypes/tierActionTypes";
function AllImages() {
  const list = useSelector((state) => state.list[0].items);
  const dragging = useSelector((state) => state.dragging);
  const currDragImg = useSelector((state) => state.index);
  const currDragGrp = useSelector((state) => state.group);
  const dispatch = useDispatch();
  const currentNode = useRef();
  const dragStartHandler = (e, index) => {
    currentNode.current = e.target;
    dispatch({
      type: tierActionTypes.SET_CURR,
      item: list[index],
      index: index,
      group: "all",
    });
    e.target.addEventListener("dragend", dragEndHandler);
    setTimeout(() => {
      dispatch({ type: tierActionTypes.SET_DRAGGING, dragging: true });
    }, 0);
  };
  const dragEndHandler = () => {
    currentNode.current = null;
    dispatch({
      type: tierActionTypes.SET_CURR,
      index: null,
      group: null,
      item: null,
    });
    dispatch({ type: tierActionTypes.SET_DRAGGING, dragging: false });
  };
  const dragEnterHandler = (e, index) => {
    //! TIER TO ALLIMAGES
    if (index !== currDragImg || currDragGrp !== "all") {
      dispatch({
        type: tierActionTypes.LIST_CHANGE,
        currIndex: currDragImg,
        hoverIndex: index,
        currGrp: "all",
      });
    }
  };

  const getStyles = (index) => {
    if (index !== currDragImg || currDragGrp !== "all") {
      return styles.dragImage;
    } else {
      return `${styles.dragImage} ${styles.current}`;
    }
  };
  return (
    <div className={styles.listOfImages}>
      {list.map((image, index) => {
        return (
          <div
            onDragStart={(e) => dragStartHandler(e, index)}
            key={index}
            onDragEnter={(e) => {
              dragEnterHandler(e, index);
            }}
            className={dragging ? getStyles(index) : styles.dragImage}
            draggable
          >
            <img src={image} alt={image} />
          </div>
        );
      })}
    </div>
  );
}
export default AllImages;
