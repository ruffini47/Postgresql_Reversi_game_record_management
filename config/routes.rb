Rails.application.routes.draw do
  get 'boards/new'
 root 'static_pages#top'
  get '/signup', to: 'users#new'
  resources :users

  # 新規ボード
  get '/new_board', to: 'boards#new', as: 'new_board'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
