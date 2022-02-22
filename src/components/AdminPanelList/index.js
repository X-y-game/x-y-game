import React from "react";
import Proptypes from "prop-types";

export default function AdminPanelList({ data, onDelete, onDisplay }) {
  let lists;
  const { channelLists, roomLists, teamLists } = data;

  if (channelLists) {
    lists = channelLists;
  }

  if (roomLists) {
    lists = roomLists;
  }

  if (teamLists) {
    lists = teamLists;
  }

  return (
    <ul>
      {lists.map((channel) => {
        const { _id: id } = channel;
        return (
          <li key={id}>
            <button type="button" onClick={() => onDisplay(id)}>
              {channel.title}
            </button>

            <button type="button" onClick={() => onDelete(id)}>
              삭제
            </button>
          </li>
        );
      })}
    </ul>
  );
}

AdminPanelList.propTypes = {
  data: Proptypes.objectOf(Proptypes.array),
  onDelete: Proptypes.func,
  onDisplay: Proptypes.func,
};

AdminPanelList.defaultProps = {
  data: null,
  onDelete: null,
  onDisplay: null,
};
