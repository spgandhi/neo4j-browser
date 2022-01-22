import React, { Component } from 'react'
import { Progress } from 'semantic-ui-react'

class CustomProgressBar extends Component<any, any> {
  public loadingStep: any
  public timerSteps: number[]

  constructor(props: any) {
    super(props)
    const {
      data: { loadingStep, timerSteps, defaultText }
    } = props
    this.state = {
      now: 10, // out of 100
      text: defaultText
    }
    this.loadingStep = loadingStep
    this.timerSteps = timerSteps
    this.updateProgress = this.updateProgress.bind(this)
  }

  componentDidMount() {
    this.inititateProgress(this.timerSteps[0], 0)
  }

  inititateProgress(timer: any, index: any) {
    setTimeout(() => this.updateProgress(index), timer)
  }

  updateProgress(index: number) {
    if (index === 6) return
    this.setState({
      now: this.loadingStep[index],
      text: this.props.data.loadingStepText
        ? this.props.data.loadingStepText[index]
        : this.props.data.defaultText
    })
    setTimeout(() => this.updateProgress(index + 1), this.timerSteps[index + 1])
  }

  render() {
    const { now, text } = this.state
    const { data, ...progressProps } = this.props
    return (
      <Progress percent={now} {...progressProps} active inverted>
        <div
          style={{
            fontSize: 14,
            fontWeight: 'normal',
            textAlign: 'left',
            color: 'white',
            marginTop: 4
          }}
        >
          {text}
        </div>
      </Progress>
    )
  }
}

export default CustomProgressBar
