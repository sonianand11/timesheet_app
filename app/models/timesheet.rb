# This is very basic version of Timesheet
# For more advanced version, we can add timesheet_entries table
# and create entries for timesheet
class Timesheet < ApplicationRecord
  belongs_to :user

  validates_presence_of :start_time
  validate :check_end_time

  def update_hours_worked
    self.update(hours_worked: hours_worked)
  end

  def hours_worked
    if start_time && end_time
      (start_time - end_time).seconds.in_hours.to_i
    else
      0
    end
  end

  def hours_worked_previous_month
    user.timesheets.where(created_at: (DateTime.now.beginning_of_month - 1.month)..DateTime.now.beginning_of_month)
  end

  def check_end_time
    if self.end_time && self.end_time < self.start_time
      self.errors.add(:end_time, "can't be less than start time ")
    end
  end

  def update_end_time
    self.update(end_time: DateTime.now)
    update_hours_worked
  end

end
