import React, { useState } from "react";

import "./Tabs.css";

const Tabs = props => {
  const [selected, setSelected] = useState(props.selected || 0);

  const clickHandler = index => {
    setSelected(index);
  };

  return (
    <div>
      <ul className="inline">
        {props.children.map((el, index) => {
          let style = index === selected ? "selected" : "";
          return (
            <li className={style} key={index} onClick={() => clickHandler(index)}>
              {el.props.title}
            </li>
          );
        })}
      </ul>
      <div className="tab">{props.children[selected]}</div>
    </div>
  );
};

export default Tabs;
