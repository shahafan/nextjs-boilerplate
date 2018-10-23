import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ data, onClick }) => (
  <div onClick={() => onClick(data)}>
    {data.title}
  </div>
);

Post.propTypes = {
  data   : PropTypes.objectOf(Object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Post;
