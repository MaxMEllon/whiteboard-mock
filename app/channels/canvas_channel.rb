class CanvasChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'canvas'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def draw_line_remote(data)
    ActionCable.server.broadcast 'canvas', data
  end
end
