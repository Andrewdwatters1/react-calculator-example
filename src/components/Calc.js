import React, { Component } from 'react';

import buttonProps from '../assets/util';
import CalcButton from './CalcButton';
import Result from './Result';
import '../App.css';

class Calc extends Component {
  constructor() {
    super()
    this.state = {
      value1: '0',
      value2: '',
      operator: '',
      displayVal: '0'
    }
  }


  // *** OPERATOR INPUTS
  handleOperatorInput = (value) => {
    if (value === "AC") this.operatorClear();
    else if (value === "+/-") this.operatorNegate();
    else if (value === "%") this.operatorPercent();
    else if (value === ".") this.operatorDecimal();
    else if (value === "=") this.evaluateResult();
    else this.setArithmeticOperator(value);
  }

  setArithmeticOperator = (operator) => this.setState({ operator })

  operatorClear = () => this.setState({ value1: '', value2: '', operator: '', displayVal: '0' })

  operatorNegate = () => {
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

  operatorPercent = () => {
    const { value1, value2 } = this.state;
    if (value2) {
      this.setState({
        value2: this._formatVal((value2 / 100).toFixed(6)),
        displayVal: this._formatVal((value2 / 100).toFixed(6))
      })
    } else this.setState({
      value1: this._formatVal((value1 / 100).toFixed(6)),
      displayVal: this._formatVal((value1 / 100).toFixed(6))
    })
  }

  operatorDecimal = () => {
    const { operator, displayVal, value2 } = this.state;
    let newDisplayVal = displayVal
      .split('')
      .filter(e => e !== ".")
      .join('');

    if (operator) {
      if (value2) {
        this.setState({
          value2: newDisplayVal + ".",
          displayVal: newDisplayVal + "."
        })
      } else {
        this.setState({
          value2: "0.",
          displayVal: "0."
        })
      }
    } else {
      this.setState({
        value1: newDisplayVal + ".",
        displayVal: newDisplayVal + "."
      })
    }
  }

  _formatVal = (value) => {
    value = value.toString();
    if (value.slice(value.length - 2, value.length) === ".0") {
      return value;
    } else return (parseFloat(value)).toString();
  }


  // *** NUMERICAL INPUTS
  handleNumberInput = (value) => {
    const { operator } = this.state;
    if (operator) this.updateRightOperand(value);
    else this.updateLeftOperand(value);
  }

  updateLeftOperand = (value) => {
    const { displayVal, value1 } = this.state;
    this.setState({
      value1: this._formatVal(value1 + value),
      displayVal: this._formatVal(displayVal + value) || '0'
    });
  }

  updateRightOperand = (value) => {
    const { displayVal, value2 } = this.state;
    if (!value2) {
      this.setState({
        displayVal: '' + value,
        value2: value
      });
    } else {
      this.setState({
        displayVal: this._formatVal(displayVal + value),
        value2: this._formatVal(displayVal + value)
      })
    }
  }

  evaluateResult = () => {
    const { operator, value1, value2 } = this.state;
    const val1 = parseFloat(value1);
    const val2 = parseFloat(value2);
    switch (operator) {
      case "+":
        this.setState({
          displayVal: this.evaluateAddition(val1, val2, operator),
          value1: this.evaluateAddition(val1, val2, operator)
        });
        break;
      case "-":
        this.setState({
          displayVal: this.evaluateSubtraction(val1, val2, operator),
          value1: this.evaluateSubtraction(val1, val2, operator)
        });
        break;
      case "*":
        this.setState({
          displayVal: this.evaluateMultiplication(val1, val2, operator),
          value1: this.evaluateMultiplication(val1, val2, operator)
        });
        break;
      case "/":
        this.setState({
          displayVal: this.evaluateDivision(val1, val2, operator),
          value1: this.evaluateDivision(val1, val2, operator)
        });
        break;
      default: 
        break;
    }
    this.setState({ value2: '', operator: '' })
  }

  evaluateAddition = (val1, val2) => this._formatVal(val1 + val2);
  evaluateSubtraction = (val1, val2) => this._formatVal(val1 - val2);
  evaluateDivision = (val1, val2) => this._formatVal(val1 / val2);
  evaluateMultiplication = (val1, val2) => this._formatVal(val1 * val2);


  updateValue = (type, value) => {
    if (type === 'op') this.handleOperatorInput(value)
    else this.handleNumberInput(value)
  }


  render() {
    const { displayVal } = this.state;

    const allCalcButtons = buttonProps.map((e, i) => {
      return (
        <CalcButton
          updateValue={this.updateValue}
          value={e.value}
          type={e.type}
          styleColor={e.styleColor}
          key={i} />
      )
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