class GameRecord < ApplicationRecord
  belongs_to :user
  #belongs_to :category
  validates :title, presence: true, length: { maximum: 100 }
  validates :black_player, presence: true, length: { maximum: 30 }
  validates :white_player, presence: true, length: { maximum: 30 }
  validates :date_played, presence: true
  validates :place_played, presence: true, length: { maximum: 100 }
end
