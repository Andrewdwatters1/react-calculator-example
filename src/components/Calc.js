import React, { Component } from 'react';

import buttonProps from '../assets/util';
import CalcButton from './CalcButton';
import Result from './Result';
import '../App.css';

class Calc extends Component {
  constructor() {
    super()
    this.state = {
      value1: '',
      value2: '',
      operand: '',
      displayVal: '0'
    }
  }


  _formatVal = (val1, val2) => (parseInt(val1, val2)).toString();


  handleClear = () => {
    this.setState({
      value1: '',
      value2: '',
      operand: '',
      displayVal: '0'
    })
  }

  handleNegate = () => {
    const { value1, value2, displayVal } = this.state;
    if (displayVal !== '0') {
      if (value2) {
        this.setState({
          value2: (-(value2)).toString(),
          displayVal: (-(value2)).toString()
        })
      } else {
        this.setState({
          value1: (-(value1)).toString(),
          displayVal: (-(value1)).toString()
        })
      }
    }
  }

  handlePercent = () => { // BUG, TRY 156 => % => % 
    const { value1, value2 } = this.state;
    if (value2) {
      this.setState({
        value2: (value2 / 100),
        displayVal: (value2 / 100)
      })
    }
    else this.setState({
      value1: (value1 / 100),
      displayVal: (value1 / 100)
    })
  }


  handleOperandInput = (value) => {
    if (value === "AC") this.handleClear();
    else if (value === "+/-") this.handleNegate();
    else if (value === "%") this.handlePercent();
  }


  handleNumInput = (value) => {
    const { operand, value1, displayVal, value2 } = this.state;
    if (!operand) {
      const formattedVal = this._formatVal(value);
      this.setState({
        value1: this._formatVal(value1 + value),
        displayVal: this._formatVal(displayVal + value) || '0'
      })
    }
  }


  updateValue = (type, value) => {
    if (type === 'op') this.handleOperandInput(value)
    else this.handleNumInput(value)
  }


  render() {
    const { displayVal } = this.state;

    const allCalcButtons = buttonProps.map((e, i) => {
      return <CalcButton
        updateValue={this.updateValue}
        value={e.value}
        type={e.type}
        styleColor={e.styleColor}
        key={i} />
    })

    return (
      <div className="calc-outer">
        <Result value={displayVal} />

        <div className="keypad-grid">
          {allCalcButtons}
        </div>

      </div>
    )
  }
}

export default Calc;
