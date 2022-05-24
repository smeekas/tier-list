import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ImageArea.module.css";
import tierActionTypes from "../../actionTypes/tierActionTypes";
const ImageArea = ({ name, list }) => {
  const dispatch = useDispatch();
  const currDragImg = useSelector((state) => state.index);
  const currDragGrp = useSelector((state) => state.group);
  const dragging = useSelector((state) => state.dragging);
  const currentNode = useRef();
  const dragEnterHandler = (e, index) => {
    if (index !== currDragImg || name !== currDragGrp) {
      dispatch({
        type: tierActionTypes.LIST_CHANGE,
        currIndex: currDragImg,
        hoverIndex: index,
        currGrp: name,
      });
    }
  };
  const dragStartHandler = (e, index) => {
    currentNode.current = e.target;
    dispatch({
      type: tierActionTypes.SET_CURR,
      item: list[index],
      index: index,
      group: name,
    });
    e.target.addEventListener("dragend", dragEndHandler);
    setTimeout(() => {
      dispatch({ type: tierActionTypes.SET_DRAGGING, dragging: true });
    }, 0);
  };
  const dragEndHandler = () => {
    dispatch({ type: tierActionTypes.SET_DRAGGING, dragging: false });
  };
  const getStyles = (index) => {
    if (index !== currDragImg || currDragGrp !== name) {
      return styles.dragImage;
    } else {
      return `${styles.dragImage} ${styles.current}`;
    }
  };
  return (
    <div
      className={styles.imageArea}
      onDragEnter={
        list.length === 0
          ? (e) => {
              // e.stopPropagation()
              dragEnterHandler(e, list.length);
            }
          : null
      }
      onDragEnd={(e) => {
        dispatch({ type: tierActionTypes.PARENT, parent: false });
      }}
    >
      {list.map((image, index) => {
        return (
          <div
            onDragStart={(e) => dragStartHandler(e, index)}
            key={index}
            onDragEnter={(e) => {
              dispatch({ type: tierActionTypes.PARENT, parent: true });
              e.stopPropagation();
              dragEnterHandler(e, index);
            }}
            className={dragging ? getStyles(index) : styles.dragImage}
            draggable
          >
            <img key={index} src={image} alt={"images"} />
          </div>
        );
      })}
    </div>
  );
};
export default ImageArea;
