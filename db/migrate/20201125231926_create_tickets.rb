class CreateTickets < ActiveRecord::Migration[6.0]
  def change
    create_table :tickets do |t|
      t.string :title
      t.string :description
      t.string :priority
      t.string :status
      t.bigint :reporter
      t.bigint :assignee
      t.belongs_to :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
