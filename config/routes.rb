Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  match '/cable', to: ActionCable.server, via: %i(get post)
end
