class Category < ApplicationRecord
  has_many :books
  has_ancestry
end
