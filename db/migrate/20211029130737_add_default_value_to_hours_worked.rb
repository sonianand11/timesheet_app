class AddDefaultValueToHoursWorked < ActiveRecord::Migration[6.1]
  def change
    change_column :timesheets, :hours_worked, :float, default: 0
  end
end
