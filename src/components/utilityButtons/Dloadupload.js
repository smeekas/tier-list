import * as htmlToImage from "html-to-image";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import styles from "./Dloadupload.module.css";
import tierActionTypes from "../../actionTypes/tierActionTypes";
function Download() {
  const uploadRef = useRef();
  const takescreenshot = () => {
    htmlToImage
      .toJpeg(document.getElementById("screenshotthis"), { quality: 0.99 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "tier.jpeg";
        link.href = dataUrl;
        link.click();
      });
  };
  const dispatch = useDispatch();
  const fileInputHandler = (e) => {
    const imageArr = [];
    let i = 0;
    for (i = 0; i < e.target.files.length; i++) {
      imageArr.push(URL.createObjectURL(e.target.files[i]));
    }
    dispatch({ type: tierActionTypes.ALL_NEW, images: imageArr });
  };
  return (
    <>
      <button className={styles.btn} onClick={takescreenshot}>
        download
      </button>
      <input
        onChange={(e) => fileInputHandler(e)}
        accept=".jpg, .png"
        multiple
        ref={uploadRef}
        hidden
        type="file"
      />
      <button
        className={styles.btn}
        onClick={() => {
          uploadRef.current.click();
        }}
      >
        upload you own
      </button>
    </>
  );
}

export default Download;
