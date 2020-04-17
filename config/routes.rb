Rails.application.routes.draw do
  
  root 'static_pages#top'
  get '/signup', to: 'users#new'

  # ログイン機能
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :users do
    resources :records, only: [:new, :create]
  end

  # 新規ボード
  get '/record/:id/boards/new', to: 'boards#new', as: 'new_board'

  # ボードインデックス
  get '/user/:user_id/boards/index', to: 'boards#index', as: 'index_board'

  # 棋譜保存
  get '/save_record/update', to: 'save_record#update', as: 'save_record'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
