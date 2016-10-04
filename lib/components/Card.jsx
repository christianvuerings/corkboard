/* eslint react/no-unused-prop-types: 0 */
import React, { PropTypes } from 'react';
import cs from 'classnames';
import StateRecorder from './StateRecorder';

export default function Card(props) {
  const {
    name,
    parts,
    options: {
      heading,
      history,
      initialState,
      inspectData,
      stacked,
    },
  } = props;

  const partsOrStateRecorders = parts.map((part) => {
    if (typeof part === 'function') {
      return (
        <StateRecorder
          fn={part}
          historyLimit={100}
          initialState={initialState}
          showHistory={history}
          showState={inspectData}
        />
      );
    }
    return part;
  });

  return (
    <div>
      {heading && <h2 className="display-s dark-gray mt0 py2 mb2 border-bottom">{name}</h2>}
      <div className={cs('mxn2', 'py2', { 'md-flex': !stacked })}>
        {partsOrStateRecorders.map((node, i) => (
          <div className={cs('px2', 'border-box', 'col-12')} key={i}>{node}</div>
        ))}
      </div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.node.isRequired,
  options: PropTypes.shape({
    heading: PropTypes.bool.isRequired,
    history: PropTypes.bool.isRequired,
    initialState: PropTypes.any.isRequired,
    inspectData: PropTypes.bool.isRequired,
    stacked: PropTypes.bool.isRequired,
  }).isRequired,
  parts: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ])).isRequired,
};

Card.defaultProps = {
  options: {
    heading: true,
    history: false,
    initialState: {},
    inspectData: false,
    stacked: false,
  },
};
