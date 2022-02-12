import React from "react";
import Proptypes from "prop-types";

export default function AdminPanelList({ data }) {
  return (
    <ul>
      {data.map((channel) => {
        const { _id: id } = channel;
        return (
          <li key={id}>
            <span>{channel.title}</span>
            <button type="button">삭제</button>
          </li>
        );
      })}
    </ul>
  );
}

AdminPanelList.propTypes = {
  data: Proptypes.arrayOf(Proptypes.object).isRequired,
};
