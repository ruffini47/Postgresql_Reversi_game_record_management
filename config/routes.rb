Rails.application.routes.draw do
  # 試し打ちする
  get 'trials/create'
  #get 'do_various_searches/new'
  #get 'various_searches/new'
  get 'save_category_searched_game_record/update' 	
  #get 'searchs/new'
  get 'save_searched_game_record/update'
  get 'delete_comment/update'
  get 'save_comment/update'
  #get 'edit_board/new'
  root 'static_pages#top'
  get '/signup', to: 'users#new'

  # ログイン機能
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :users do
    #様々な検索をする。結果を表示する。
    resources :various_searches, only: [:new, :create]
    #棋譜検索盤面を開く
    resources :searchs, only: [:new, :create]
    resources :game_records do
      # 棋譜検索結果を表示する
      get :board_search, on: :collection
      # カテゴリ検索結果を表示する
      get :category_search, on: :collection
      #様々な検索結果を表示する
      #post :various_search, on: :collection
      # 棋譜検索結果で削除する
      delete :board_search_destroy, on: :member
      # カテゴリ検索結果で削除する
      delete :category_search_destroy, on: :member
      # 様々な検索結果で削除する
      delete :various_search_destroy, on: :member
    end
  end

#  resources :users, only: [:new] do
#    resources :categories, only: [:new] do
#      get :new
#    end
#  end


  # カテゴリ検索する
#  resources :users do
#    resources :books do
#      collection do
#        get 'get_category_children', defaults: { format: 'json' }
#        get 'get_category_grandchildren', defaults: { format: 'json' }
#      end
#      member do
#        get 'get_category_children', defaults: { format: 'json' }
#        get 'get_category_grandchildren', defaults: { format: 'json' }
#      end
#    end
#  end


  #VS AI Play 設定
  get '/vs_ai_configration/new', to: 'vs_ai_configration#new', as: 'vs_ai_configration'

  #VS AI Play game_record
  get '/your_move/:your_move/vs_ai_game_records/new', to: 'vs_ai_game_record#new', as: 'new_user_vs_ai_game_record'
  post '/users/:user_id/your_move/:your_move/vs_ai_game_records/create', to: 'vs_ai_game_record#create', as: 'create_user_vs_ai_game_record'

  # ボード表示
  get '/game_record/:id/boards/show', to: 'boards#show', as: 'show_board'

  # 棋譜保存
  get '/save_game_record/update', to: 'save_game_record#update', as: 'save_game_record'

  # 棋譜別名で保存
  get  '/save_as_game_record/update', to:'save_as_game_record#update', as:'save_as_game_record'

  # 棋譜を指定して開く
  get '/users/:user_id/specify_kifu_and_open/new', to:'specify_kifu_and_open#new', as: 'new_user_specify_kifu_and_open'
  post '/users/:user_id/specify_kifu_and_open/create', to:'specify_kifu_and_open#create', as: 'create_user_specify_kifu_and_open'

  # 盤面を編集する
  get 'users/:user_id/edit_board/new', to:'edit_board#new', as: 'new_user_edit_board'
  post 'users/:user_id/edit_board/create', to:'edit_board#create', as: 'create_user_edit_board'

  # カテゴリ検索する
  get '/users/:user_id/category/' , to:'categories#new', as: 'category'
  get '/users/:user_id/books/:id/get_category_children', to: 'books#get_category_children', as: 'get_category_children_user_book', defaults: { format: 'json' }
  get '/users/:user_id/books/:id/get_category_grandchildren', to: 'books#get_category_grandchildren', as: 'get_category_grandchildren_user_book', defaults: { format: 'json' } 

  # 様々な検索削除後再表示用
  #get '/users/:user_id/various_searches' ,to:'various_searches#create'


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
