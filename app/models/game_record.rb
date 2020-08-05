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

  # various_search kifu ありの場合
  scope :various_search, -> (user_id, title, black_player, white_player, date_played, place_played, kifu) { 
	  user_id(user_id).title(title).black_player(black_player).white_player(white_player).date_played(date_played).place_played(place_played).kifu(kifu) }
  scope :various_search_without_title, -> (user_id, black_player, white_player, date_played, place_played, kifu) {
	  user_id(user_id).black_player(black_player).white_player(white_player).date_played(date_played).place_played(place_played).kifu(kifu) }
  scope :various_search_without_black_player, -> (user_id, title, white_player, date_played, place_played, kifu) { 
	  user_id(user_id).title(title).white_player(white_player).date_played(date_played).place_played(place_played).kifu(kifu) }
  scope :various_search_without_white_player, -> (user_id, title, black_player, date_played, place_played, kifu) { 
	  user_id(user_id).title(title).black_player(black_player).date_played(date_played).place_played(place_played).kifu(kifu) }
  scope :various_search_without_date_played, -> (user_id, title, black_player, white_player, place_played, kifu) { 
	  user_id(user_id).title(title).black_player(black_player).white_player(white_player).place_played(place_played).kifu(kifu) }
  scope :various_search_without_place_played, -> (user_id, title, black_player, white_player, date_played, kifu) { 
	  user_id(user_id).title(title).black_player(black_player).white_player(white_player).date_played(date_played).kifu(kifu) }
  scope :various_search_without_title_black_player, -> (user_id, white_player, date_played, place_played, kifu) { 
	  user_id(user_id).white_player(white_player).date_played(date_played).place_played(place_played).kifu(kifu) }
  scope :various_search_without_title_white_player, -> (user_id, black_player, date_played, place_played, kifu) { 
	  user_id(user_id).black_player(black_player).date_played(date_played).place_played(place_played).kifu(kifu) }
  scope :various_search_without_title_date_played, -> (user_id, black_player, white_player, place_played, kifu) { 
	  user_id(user_id).black_player(black_player).white_player(white_player).place_played(place_played).kifu(kifu) }
  scope :various_search_without_title_place_played, -> (user_id, black_player, white_player, date_played, kifu) { 
	  user_id(user_id).black_player(black_player).white_player(white_player).date_played(date_played).kifu(kifu) }
  scope :various_search_without_black_player_white_player, -> (user_id, title, date_played, place_played, kifu) { 
	  user_id(user_id).title(title).date_played(date_played).place_played(place_played).kifu(kifu) }
  scope :various_search_without_black_player_date_played, -> (user_id, title, white_player, place_played, kifu) { 
	  user_id(user_id).title(title).white_player(white_player).place_played(place_played).kifu(kifu) }
  scope :various_search_without_black_player_place_played, -> (user_id, title, white_player, date_played, kifu) { 
	  user_id(user_id).title(title).white_player(white_player).date_played(date_played).kifu(kifu) }
  scope :various_search_without_white_player_date_played, -> (user_id, title, black_player, place_played, kifu) { 
	  user_id(user_id).title(title).black_player(black_player).place_played(place_played).kifu(kifu) }
  scope :various_search_without_white_player_place_played, -> (user_id, title, black_player, date_played, kifu) { 
	  user_id(user_id).title(title).black_player(black_player).date_played(date_played).kifu(kifu) }
  scope :various_search_without_date_played_place_played, -> (user_id, title, black_player, white_player, kifu) { 
	  user_id(user_id).title(title).black_player(black_player).white_player(white_player).kifu(kifu) }
  scope :various_search_without_title_black_player_white_player, -> (user_id, date_played, place_played, kifu) { 
	  user_id(user_id).date_played(date_played).place_played(place_played).kifu(kifu) }
  scope :various_search_without_title_black_player_date_played, -> (user_id, white_player, place_played, kifu) { 
	  user_id(user_id).white_player(white_player).place_played(place_played).kifu(kifu) }
  scope :various_search_without_title_black_player_place_played, -> (user_id, white_player, date_played, kifu) { 
	  user_id(user_id).white_player(white_player).date_played(date_played).kifu(kifu) }
  scope :various_search_without_title_white_player_date_played, -> (user_id, black_player, place_played, kifu) { 
	  user_id(user_id).black_player(black_player).place_played(place_played).kifu(kifu) }
  scope :various_search_without_title_white_player_place_played, -> (user_id, black_player, date_played, kifu) { 
	  user_id(user_id).black_player(black_player).date_played(date_played).kifu(kifu) }
  scope :various_search_without_title_date_played_place_played, -> (user_id, black_player, white_player, kifu) { 
	  user_id(user_id).black_player(black_player).white_player(white_player).kifu(kifu) }
  scope :various_search_without_black_player_white_player_date_played, -> (user_id, title, place_played, kifu) { 
	  user_id(user_id).title(title).place_played(place_played).kifu(kifu) }
  scope :various_search_without_black_player_white_player_place_played, -> (user_id, title, date_played, kifu) { 
	  user_id(user_id).title(title).date_played(date_played).kifu(kifu) }
  scope :various_search_without_white_player_date_played_place_played, -> (user_id, title, black_player, kifu) { 
	  user_id(user_id).title(title).black_player(black_player).kifu(kifu) }
  scope :various_search_without_title_black_player_white_player_date_played, -> (user_id, place_played, kifu) { 
	  user_id(user_id).place_played(place_played).kifu(kifu) }
  scope :various_search_without_title_black_player_white_player_place_played, -> (user_id, date_played, kifu) { 
	  user_id(user_id).date_played(date_played).kifu(kifu) }
  scope :various_search_without_title_black_player_date_played_place_played, -> (user_id, white_player, kifu) { 
	  user_id(user_id).white_player(white_player).kifu(kifu) }
  scope :various_search_without_title_white_player_date_played_place_played, -> (user_id, black_player, kifu) { 
	  user_id(user_id).black_player(black_player).kifu(kifu) }
  scope :various_search_without_black_player_white_player_date_played_place_played, -> (user_id, title, kifu) { 
	  user_id(user_id).title(title).kifu(kifu) }
  scope :various_search_without_title_black_player_white_player_date_played_place_played, -> (user_id, kifu) {
	  user_id(user_id).kifu(kifu) }
 
  # various_search kifu なしの場合
  scope :various_search_kifu, -> (user_id, title, black_player, white_player, date_played, place_played) { 
	  user_id(user_id).title(title).black_player(black_player).white_player(white_player).date_played(date_played).place_played(place_played) }
  scope :various_search_without_title_kifu, -> (user_id, black_player, white_player, date_played, place_played) {
	  user_id(user_id).black_player(black_player).white_player(white_player).date_played(date_played).place_played(place_played) }
  scope :various_search_without_black_player_kifu, -> (user_id, title, white_player, date_played, place_played) { 
	  user_id(user_id).title(title).white_player(white_player).date_played(date_played).place_played(place_played) }
  scope :various_search_without_white_player_kifu, -> (user_id, title, black_player, date_played, place_played) { 
	  user_id(user_id).title(title).black_player(black_player).date_played(date_played).place_played(place_played) }
  scope :various_search_without_date_played_kifu, -> (user_id, title, black_player, white_player, place_played) { 
	  user_id(user_id).title(title).black_player(black_player).white_player(white_player).place_played(place_played) }
  scope :various_search_without_place_played_kifu, -> (user_id, title, black_player, white_player, date_played) { 
	  user_id(user_id).title(title).black_player(black_player).white_player(white_player).date_played(date_played) }
  scope :various_search_without_title_black_player_kifu, -> (user_id, white_player, date_played, place_played) { 
	  user_id(user_id).white_player(white_player).date_played(date_played).place_played(place_played) }
  scope :various_search_without_title_white_player_kifu, -> (user_id, black_player, date_played, place_played) { 
	  user_id(user_id).black_player(black_player).date_played(date_played).place_played(place_played) }
  scope :various_search_without_title_date_played_kifu, -> (user_id, black_player, white_player, place_played) { 
	  user_id(user_id).black_player(black_player).white_player(white_player).place_played(place_played) }
  scope :various_search_without_title_place_played_kifu, -> (user_id, black_player, white_player, date_played) { 
	  user_id(user_id).black_player(black_player).white_player(white_player).date_played(date_played) }
  scope :various_search_without_black_player_white_player_kifu, -> (user_id, title, date_played, place_played) { 
	  user_id(user_id).title(title).date_played(date_played).place_played(place_played) }
  scope :various_search_without_black_player_date_played_kifu, -> (user_id, title, white_player, place_played) { 
	  user_id(user_id).title(title).white_player(white_player).place_played(place_played) }
  scope :various_search_without_black_player_place_played_kifu, -> (user_id, title, white_player, date_played) { 
	  user_id(user_id).title(title).white_player(white_player).date_played(date_played) }
  scope :various_search_without_white_player_date_played_kifu, -> (user_id, title, black_player, place_played) { 
	  user_id(user_id).title(title).black_player(black_player).place_played(place_played) }
  scope :various_search_without_white_player_place_played_kifu, -> (user_id, title, black_player, date_played) { 
	  user_id(user_id).title(title).black_player(black_player).date_played(date_played) }
  scope :various_search_without_date_played_place_played_kifu, -> (user_id, title, black_player, white_player) { 
	  user_id(user_id).title(title).black_player(black_player).white_player(white_player) }
  scope :various_search_without_title_black_player_white_player_kifu, -> (user_id, date_played, place_played) { 
	  user_id(user_id).date_played(date_played).place_played(place_played) }
  scope :various_search_without_title_black_player_date_played_kifu, -> (user_id, white_player, place_played) { 
	  user_id(user_id).white_player(white_player).place_played(place_played) }
  scope :various_search_without_title_black_player_place_played_kifu, -> (user_id, white_player, date_played) { 
	  user_id(user_id).white_player(white_player).date_played(date_played) }
  scope :various_search_without_title_white_player_date_played_kifu, -> (user_id, black_player, place_played) { 
	  user_id(user_id).black_player(black_player).place_played(place_played) }
  scope :various_search_without_title_white_player_place_played_kifu, -> (user_id, black_player, date_played) { 
	  user_id(user_id).black_player(black_player).date_played(date_played) }
  scope :various_search_without_title_date_played_place_played_kifu, -> (user_id, black_player, white_player) { 
	  user_id(user_id).black_player(black_player).white_player(white_player) }
  scope :various_search_without_black_player_white_player_date_played_kifu, -> (user_id, title, place_played) { 
	  user_id(user_id).title(title).place_played(place_played) }
  scope :various_search_without_black_player_white_player_place_played_kifu, -> (user_id, title, date_played) { 
	  user_id(user_id).title(title).date_played(date_played) }
  scope :various_search_without_white_player_date_played_place_played_kifu, -> (user_id, title, black_player) { 
	  user_id(user_id).title(title).black_player(black_player) }
  scope :various_search_without_title_black_player_white_player_date_played_kifu, -> (user_id, place_played) { 
	  user_id(user_id).place_played(place_played) }
  scope :various_search_without_title_black_player_white_player_place_played_kifu, -> (user_id, date_played) { 
	  user_id(user_id).date_played(date_played) }
  scope :various_search_without_title_black_player_date_played_place_played_kifu, -> (user_id, white_player) { 
	  user_id(user_id).white_player(white_player) }
  scope :various_search_without_title_white_player_date_played_place_played_kifu, -> (user_id, black_player) { 
	  user_id(user_id).black_player(black_player) }
  scope :various_search_without_black_player_white_player_date_played_place_played_kifu, -> (user_id, title) { 
	  user_id(user_id).title(title) }
  scope :various_search_without_title_black_player_white_player_date_played_place_played_kifu, -> (user_id) {
          user_id(user_id) } 
 


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
