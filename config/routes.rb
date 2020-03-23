Rails.application.routes.draw do
  
  root 'static_pages#top'
  get '/signup', to: 'users#new'

  # ログイン機能
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :users

  # 新規ボード
  get '/new_board', to: 'boards#new', as: 'new_board'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
