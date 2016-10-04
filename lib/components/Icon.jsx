import React, { PropTypes } from 'react';

export default function Icon(props) {
  const { icon, label } = props;
  return <i className={['fa', `fa-${icon}`].join(' ')} title={label} />;
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
