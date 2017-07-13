import React from 'react';
import PropTypes from 'prop-types';

const TimeInput = (props) => {
  const { value, min, max } = props;

  return (
    <input
      className="input-time"
      type="number"
      value={value}
      onChange={e => props.onValueChange(Number(e.target.value))}
      onKeyPress={e => props.onValueChange(Number(e.target.value))}
      min={min}
      max={max}
    />
  );
};

TimeInput.propTypes = {
  max: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default TimeInput;
