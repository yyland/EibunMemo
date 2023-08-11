class EnglishText < ApplicationRecord
  belongs_to :user
  has_many :memo_words, dependent: :destroy
end
