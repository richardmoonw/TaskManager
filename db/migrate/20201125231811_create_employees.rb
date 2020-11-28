class CreateEmployees < ActiveRecord::Migration[6.0]
  def change
    create_table :employees do |t|
      t.string :name
      t.string :role
      t.string :email

      t.timestamps
    end
  end
end
