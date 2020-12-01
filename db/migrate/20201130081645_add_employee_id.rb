class AddEmployeeId < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :employee_id, :bigint
    remove_column :comments, :commenter
  end
end
