import React, { useState, useEffect } from "react";
import "./TableView.css";
import {
  setSelected,
  sortBy,
  selectHeaders,
  selectData,
  selectSelected,
} from "../../redux/slices/tableViewSlice";
import { useSelector, useDispatch } from "react-redux";

export default function TableView() {
  const [up, setUp] = useState({ header: null, value: false });
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const headers = useSelector(selectHeaders);
  const selected = useSelector(selectSelected);
  return (
    <div className="tableViewBigContainer">
      <ul className="tableViewHeaders">
        {headers.map((header, key) => (
          <li
            key={key}
            style={{ flex: header.flex }}
            onClick={() => {
              setUp({ header: key, value: !up.value });
              dispatch(sortBy({ header: header.name, direction: up.value }));
            }}
          >
            {header.name}
            {up.header == key ? (
              <span>
                <i
                  className={
                    up.value ? "fas fa-chevron-down" : "fas fa-chevron-up"
                  }
                ></i>
              </span>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
      <div className="tableViewContainer">
        <table className="tableView">
          <tbody>
            {data.map((row, key) => (
              <tr
                key={key}
                className={selected == row.id ? "tableViewSelectedRow" : ""}
                onClick={() => {
                  dispatch(setSelected(row.id));
                }}
              >
                {headers.map((header, key) => (
                  <td key={key} style={{ flex: header.flex }}>
                    {row[header.name]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
