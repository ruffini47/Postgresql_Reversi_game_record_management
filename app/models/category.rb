class Category < ApplicationRecord
  has_many :game_records
  has_ancestry
end
