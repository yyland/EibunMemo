# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :english_texts, dependent: :destroy

  def email=(_value)
    self[:email] = "#{self[:username]}@eibunmemo.com"
  end

  validates :username, presence: true, uniqueness: true
end
