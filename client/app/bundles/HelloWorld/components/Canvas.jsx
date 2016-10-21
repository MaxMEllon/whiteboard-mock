import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';

export default class Canvas extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    updateCanvas: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
    };
    autoBind(this);
    this.resetMousePosition();
  }

  componentDidMount() {
    this.updateCanvas();
    const { canvas } = this.refs;
    canvas.addEventListener('mousedown', this.onDown, false);
    canvas.addEventListener('mouseup', this.onUp, false);
    canvas.addEventListener('mousemove', this.onMove, false);
  }

  onDown(event) {
    this.setState({ dragging: true });
  }

  onMove(event) {
    const { canvas } = this.refs;
    const context = canvas.getContext('2d');
    const offsetX = canvas.getBoundingClientRect().left;
    const offsetY = canvas.getBoundingClientRect().top;
    const x = event.clientX - offsetX;
    const y = event.clientY - offsetY;
    if (this.state.dragging) this.drawLine(context, x, y);
  }

  drawLine(context, x, y) {
    if (this.x === '') {
      context.moveTo(x, y);
    } else {
      context.moveTo(this.x, this.y);
    }
    context.lineTo(x, y);
    context.lineCap = 'round';
    context.lineWidth = 4;
    context.stroke();
    this.updateLastMousePosition(this.x, this.y, x, y);
  }

  resetMousePosition() {
    this.x = '';
    this.y = '';
  }

  updateLastMousePosition(prevX, prevY, x, y) {
    this.x = x;
    this.y = y;
    window.App.canvas.drawLineRemote({ prevX, prevY, x, y });
  }

  onUp(event) {
    this.setState({ dragging: false });
    this.resetMousePosition();
  }

  updateCanvas() {
    const { canvas } = this.refs;
    const context = canvas.getContext('2d');
    this.props.updateCanvas(context);
  }

  render() {
    const { width, height } = this.props;
    return (
      <canvas
        id="canvas"
        ref="canvas"
        width={width}
        height={height}
      />
    );
  }
}
