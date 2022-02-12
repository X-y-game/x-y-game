/* eslint-disable no-underscore-dangle */
import React from "react";
import Proptypes from "prop-types";

export default function AdminPanelList({ data }) {
  return (
    <ul>
      {data.map((channel) => {
        return (
          <li key={channel._id}>
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
