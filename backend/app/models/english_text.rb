class EnglishText < ApplicationRecord
  has_many :memo_words, dependent: :destroy
end
