import React from 'react';

import {fontSizes} from '../assets/util';

export default class Result extends React.PureComponent {

  render() {
    const { value } = this.props;
    const fontSize = value.length > 10 ? 'small' : value.length > 7 ? 'medium' : 'large';
    const fontClass = fontSizes[fontSize];

    const displayVal = this.props.value.slice(0, 13);

    return (
      <div className={`result ${fontClass}`}>
        <p>{displayVal}</p>
      </div>
    )
  }
}