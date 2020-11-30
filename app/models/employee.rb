class Employee < ApplicationRecord
    has_many :teams, dependent: :destroy
    has_many :projects, through: :teams
    belongs_to :user
end
