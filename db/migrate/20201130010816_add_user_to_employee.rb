class AddUserToEmployee < ActiveRecord::Migration[6.0]
  def change
    add_reference :employees, :user, foreign_key: true
  end
end
