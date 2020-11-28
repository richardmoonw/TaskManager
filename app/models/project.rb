class Project < ApplicationRecord
    has_many :tickets,  dependent: :destroy
    has_many :teams,  dependent: :destroy
    has_many :employees, through: :teams
end
