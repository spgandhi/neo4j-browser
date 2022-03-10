import React, { Component } from 'react'
import { Progress } from 'semantic-ui-react'

class CustomProgressBar extends Component<any, any> {
  public loadingStep: any
  public timerSteps: number[]
  public timer: any

  constructor(props: any) {
    super(props)
    const {
      data: { loadingStep, timerSteps, defaultText }
    } = props
    this.state = {
      now: 10, // out of 100
      text: defaultText
    }
    this.timer = null
    this.loadingStep = loadingStep
    this.timerSteps = timerSteps
    this.updateProgress = this.updateProgress.bind(this)
  }

  componentDidMount() {
    this.inititateProgress()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  inititateProgress() {
    this.updateProgress(0)
  }

  updateProgress(index: number) {
    if (index === this.loadingStep.length) return
    this.setState({
      now: this.loadingStep[index],
      text: this.props.data.loadingStepText
        ? this.props.data.loadingStepText[index]
        : this.props.data.defaultText
    })
    this.timer = setTimeout(
      () => this.updateProgress(index + 1),
      this.timerSteps[index + 1]
    )
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
