class GameRecord < ApplicationRecord
  belongs_to :user
  #belongs_to :category
  validates :title, presence: true, length: { maximum: 100 }
  validates :black_player, presence: true, length: { maximum: 30 }
  validates :white_player, presence: true, length: { maximum: 30 }
  validates :date_played, presence: true
  validates :place_played, presence: true, length: { maximum: 100 }

  # various_searchのためのscope
  scope :user_id, -> (user_id){ where(user_id: user_id) }
  scope :title, -> (title) { where(title: title) }
  scope :black_player, -> (black_player) { where(black_player: black_player) }
  scope :white_player, -> (white_player) { where(white_player: white_player) }
  scope :date_played, -> (date_played) { where(date_played: date_played.beginning_of_day..date_played.end_of_day) }
  scope :place_played, -> (place_played) { where(place_played: place_played) }
  scope :kifu, -> (kifu) { where("lower(kifu) LIKE ?", kifu + "%") }
  scope :various_search, -> (user_id, title, black_player, white_player, date_played, place_played, kifu) { 
	  user_id(user_id).title(title).black_player(black_player).white_player(white_player).date_played(date_played).place_played(place_played).kifu(kifu) }
  
  # category_searchのためのscope
  scope :category_searched, -> { where(category_searched: true) }
  scope :category_search, -> (user_id) { user_id(user_id).category_searched }

  # board_searchのためのscope
  scope :searched, -> { where(searched: true) }
  scope :search, -> (user_id) { user_id(user_id).searched }
  scope :order_updated_at_asc, -> { order(updated_at: "ASC") }
  scope :latest_search, -> (user_id) { search(user_id).order_updated_at_asc.last }

  scope :board0, -> (board0) { where(board0: board0) }
  scope :player_color0, -> (player_color0) { where(player_color0: player_color0) }
  scope :searched_false, -> { where(searched: false) }
  scope :board_search, -> (user_id, board0, player_color0, kifu) { user_id(user_id).board0(board0).player_color0(player_color0).searched_false.kifu(kifu) }
end
