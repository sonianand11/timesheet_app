class CreateTimesheets < ActiveRecord::Migration[6.1]
  def change
    create_table :timesheets do |t|
      t.integer :user_id
      t.datetime :start_time
      t.datetime :end_time
      t.float :hours_worked

      t.timestamps
    end
  end
end
