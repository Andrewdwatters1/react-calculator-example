import React from 'react';

export default class CalcButton extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { value, type, updateValue, styleColor } = this.props;
    console.log(this.props)
    return (
      <button onClick={() => updateValue(type, value)} className={styleColor}>{value}</button>
    )
  }
}