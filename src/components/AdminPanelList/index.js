/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components";

export default function AdminPanelList({ data, onDelete, onDisplay, selected }) {
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
    <List>
      {lists.map((channel) => {
        const { _id: id } = channel;

        return (
          <li key={id}>
            <button type="button" className={selected[id] ? "selected" : ""} onClick={() => onDisplay(id)}>
              {channel.title}
            </button>

            <button type="button" onClick={() => onDelete(id)}>
              삭제
            </button>
          </li>
        );
      })}
    </List>
  );
}

const List = styled.ul`
  .selected {
    color: #fff;
    background: #54628c;
  }
`;

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
