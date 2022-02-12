import React from "react";
import styled from "styled-components";
import Proptypes from "prop-types";
import AdminPanelContainer from "../AdminPanelContainer";

export default function AdminPanel({ title, placeholder, data }) {
  return (
    <Channels>
      <AdminPanelContainer title={title} placeholder={placeholder} data={data} />
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
};

AdminPanel.defaultProps = {
  data: null,
};
