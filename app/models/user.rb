class User < ApplicationRecord
  validates :email_address, presence: true,
            uniqueness: { case_sensitive: false, message: "Email já está em uso" }
  has_secure_password
  has_many :sessions, dependent: :destroy

  normalizes :email_address, with: ->(e) { e.strip.downcase }
  validates :name, presence: true
end
