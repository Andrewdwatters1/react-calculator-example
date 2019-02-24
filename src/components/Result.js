import React from 'react';

export default class Result extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { value } = this.props;
    console.log(this.props)
    return (
      <div className="result">
        <p>{value}</p>
      </div>
    )
  }
}