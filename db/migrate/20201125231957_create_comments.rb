class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string :comment
      t.string :commenter
      t.belongs_to :ticket, null: false, foreign_key: true

      t.timestamps
    end
  end
end
