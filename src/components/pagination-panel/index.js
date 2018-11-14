import React from "react";
import PropTypes from "prop-types";
import { List, ListItem } from '@material-ui/core';
import { Pagination, SelectWithOptions } from "..";
import styled from "styled-components";

export const PaginationPanelWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(0, auto));
  justify-content: end;
  gap: 1rem;
  background: ${props => props.theme.palette.background.paper};
`;

const PaginationPanel = ({
  countPerPage,
  page,
  maxPageCount,
  onChangePage,
  onChangeCount
}) => (
  <List>
    <ListItem>
      <PaginationPanelWrapper>
        <SelectWithOptions
          onChange={onChangeCount}
          value={countPerPage}
          label="Words per page"
          options={[
            { key: 1, title: 1 },
            { key: 5, title: 5 },
            { key: 10, title: 10 },
            { key: 25, title: 25 },
            { key: 50, title: 50 },
            { key: 100, title: 100 }
          ]}
        />
        <Pagination
          pageNumber={page}
          maxPageCount={maxPageCount}
          onChangePage={onChangePage}
        />
      </PaginationPanelWrapper>
    </ListItem>
  </List>
);

PaginationPanel.propTypes = {
  countPerPage: PropTypes.number,
  page: PropTypes.number,
  maxPageCount: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  onChangeCount: PropTypes.func.isRequired
};

PaginationPanel.defaultProps = {
  countPerPage: 5,
  page: 1,
  maxPageCount: 0
};

export default PaginationPanel;
