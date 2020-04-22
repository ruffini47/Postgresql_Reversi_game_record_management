Rails.application.routes.draw do
  
  root 'static_pages#top'
  get '/signup', to: 'users#new'

  # ログイン機能
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :users do
    resources :game_records
  end

  # ボード表示
  get '/game_record/:id/from_saved/:from_saved/boards/show', to: 'boards#show', as: 'show_board'

  # 棋譜保存
  get '/save_game_record/update', to: 'save_game_record#update', as: 'save_game_record'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
