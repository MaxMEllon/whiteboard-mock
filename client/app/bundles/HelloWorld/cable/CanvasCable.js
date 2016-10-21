const cableCreator = (callback) => {
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
      callback(data);
    },

    drawLineRemote(params) {
      this.perform('draw_line_remote', params);
    }
  });
}

export default cableCreator;
