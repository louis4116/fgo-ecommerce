import React, { useState } from "react";
import data from "../../data";

import classes from "./footer-content.module.css";
const Bottom = () => {
  const [show, setShow] = useState(false);

  const showInf = () => {
    if (show === true) {
      return setShow(false);
    }
    setShow(true);
  };
  return (
    <div
      className={show ? classes["homeinf-show"] : classes.homeInf}
      onClick={() => showInf()}
    >
      <div className={classes["homeInf-first"]}>
        {data.map((item, i) => (
          <div className={classes[`homeInf-item-${i}`]} key={i}>
            <div className={classes["homeInf-second"]}>
              <div className={classes["homeInf-third"]}>{item.title} </div>
            </div>
            <div className={classes[`homeInf-des-show-${i}`]}>
              {item.description}
            </div>
            <div className={classes[`homeInf-video-${i}`]}>
              <div className={classes["homeInf-video-content"]}>
                {item.video}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bottom;
