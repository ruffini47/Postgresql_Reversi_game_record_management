Rails.application.routes.draw do
  
  get 'records/new'
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
  get '/record/:id/new_board', to: 'boards#new', as: 'new_board'

  # 棋譜保存
  get '/save_record', to: 'save_record#update', as: 'save_record'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
