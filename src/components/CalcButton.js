import React from 'react';

export default class CalcButton extends React.PureComponent {

  render() {
    const { value, type, updateValue, styleColor } = this.props;
    return (
      <button
        onClick={() => updateValue(type, value)}
        className={styleColor}>
        {value}
      </button>
    )
  }
}