class GameRecord < ApplicationRecord
  belongs_to :user
  #belongs_to :category
  validates :title, presence: true, length: { maximum: 100 }
  validates :black_player, presence: true, length: { maximum: 30 }
  validates :white_player, presence: true, length: { maximum: 30 }
  validates :date_played, presence: true
  validates :place_played, presence: true, length: { maximum: 100 }

  scope :user_id, -> (user_id){ where(user_id: user_id) }
  scope :title, -> (title) { where(title: title) }
  scope :black_player, -> (black_player) { where(black_player: black_player) }
  scope :white_player, -> (white_player) { where(white_player: white_player) }
  scope :date_played, -> (date_played) { where(date_played: date_played.beginning_of_day..date_played.end_of_day) }
  scope :place_played, -> (place_played) { where(place_played: place_played) }
  scope :kifu, -> (kifu) { where("lower(kifu) LIKE ?", kifu + "%") }
  scope :various_search, -> (user_id, title, black_player, white_player, date_played, place_played, kifu) { 
	  user_id(user_id).title(title).black_player(black_player).white_player(white_player).date_played(date_played).place_played(place_played).kifu(kifu) }

end
