class MemoWord < ApplicationRecord
  belongs_to :english_text
  has_many :memos
  
end
