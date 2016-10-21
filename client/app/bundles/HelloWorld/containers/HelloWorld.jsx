import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Canvas from '../components/Canvas';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const cableCreator = () => {
  window.App = window.App || {};
  App.cable = ActionCable.createConsumer('/cable');

  App.canvas = App.cable.subscriptions.create({ channel: 'CanvasChannel' }, {
    connected() {
      console.log('connect');
    },

    disconnected() {
      console.log('disconnect');
    },

    received(data) {
      console.log(data);
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');
      if (data.prevX === '') {
        context.moveTo(data.x, data.y);
      } else {
        context.moveTo(data.prevX, data.prevY);
      }
      context.lineTo(data.x, data.y);
      context.lineCap = 'round';
      context.lineWidth = 4;
      context.stroke();
    },

    drawLineRemote(params) {
      this.perform('draw_line_remote', params);
    }
  });
}

export default class HelloWorld extends React.Component {
  constructor(props, context) {
    super(props, context);
    cableCreator();
    const canvasProps = {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      updateCanvas: (context) => {
        console.log('hoge');
      },
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
