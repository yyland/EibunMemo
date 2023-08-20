# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :english_texts, dependent: :destroy

  def email=(_value)
    unique_token = SecureRandom.hex(8)
    self[:email] = "#{self[:username]}_#{unique_token}@eibunmemo.com"
  end

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
end
