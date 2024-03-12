import { Pagination } from '@mui/material';
import PropTypes from 'prop-types';

function CustomPagination(props) {
  const { labelRowsPerPage, ...paginationProps } = props;
  return <Pagination {...paginationProps} labelRowsPerPage={labelRowsPerPage} />;
}

CustomPagination.propTypes = {
  labelRowsPerPage: PropTypes.string,
};

export default CustomPagination;
