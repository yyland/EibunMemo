# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :english_texts;

  def email=(value)
    self[:email] = self[:username] + "@eibunmemo.com"
  end

  validates :username, presence: true, uniqueness: true
end
