# This is very basic version of Timesheet
# For more advanced version, we can add timesheet_entries table
# and create entries for timesheet
class Timesheet < ApplicationRecord
  belongs_to :user

  validates_presence_of :start_time
  validate :check_end_time

  def check_end_time
    if self.end_time && self.start_time && self.end_time < self.start_time
      self.errors.add(:end_time, "can't be less than start time ")
    end
  end

  def update_end_time
    self.update(end_time: DateTime.now)
  end

end
