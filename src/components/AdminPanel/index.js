import React from "react";
import styled from "styled-components";
import Proptypes from "prop-types";
import AdminPanelContainer from "../AdminPanelContainer";

export default function AdminPanel({
  title,
  placeholder,
  data,
  onDelete,
  onHandleChange,
  onClick,
  onDisplay,
  onHandleKeyDown,
  name,
  password,
}) {
  return (
    <Channels>
      <AdminPanelContainer
        title={title}
        placeholder={placeholder}
        data={data}
        onDelete={onDelete}
        onHandleChange={onHandleChange}
        onHandleClick={onClick}
        onHandleKeyDown={onHandleKeyDown}
        onHandleDisplay={onDisplay}
        name={name}
        password={password}
      />
    </Channels>
  );
}

const Channels = styled.section`
  width: 100%;
  max-width: 750px;
  margin-left: 20px;
  float: left;
  padding-left: 20px;
  padding-right: 20px;
  min-height: 1px;
  box-sizing: border-box;
  margin-top: 20px;
`;

AdminPanel.propTypes = {
  title: Proptypes.string.isRequired,
  placeholder: Proptypes.string.isRequired,
  data: Proptypes.objectOf(Proptypes.array),
  onDelete: Proptypes.func,
  onHandleChange: Proptypes.func.isRequired,
  onClick: Proptypes.func,
  onHandleKeyDown: Proptypes.func,
  onDisplay: Proptypes.func,
  name: Proptypes.string.isRequired,
  password: Proptypes.string,
};

AdminPanel.defaultProps = {
  data: null,
  onDelete: null,
  onClick: null,
  onHandleKeyDown: null,
  onDisplay: null,
  password: "",
};
