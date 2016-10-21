import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Canvas from '../components/Canvas';
import cableCreator from '../cable/CanvasCable';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const register = (payload) => {
  const { action } = payload;
  switch (action) {
    case 'draw_line_remote':
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');
      if (payload.prevX === '') {
        context.moveTo(payload.x, payload.y);
      } else {
        context.moveTo(payload.prevX, payload.prevY);
      }
      context.lineTo(payload.x, payload.y);
      context.lineCap = 'round';
      context.lineWidth = 4;
      context.stroke();
      break;

    case 'please_canvas_image':
      break;
    default:
      // do nothing
  }
}

export default class HelloWorld extends React.Component {
  constructor(props, context) {
    super(props, context);
    cableCreator(register);
    const canvasProps = {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      updateCanvas: (context) => { },
    }

    this.state = {
      name: this.props.name,
      text: 'default',
      canvasProps,
    };
  }

  render() {
    return (
      <div>
        <Canvas {...this.state.canvasProps} />
      </div>
    );
  }
}

