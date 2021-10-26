class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :timesheets, dependent: :destroy

  def current_timessheet_slot
    timesheets.where(end_time: nil).first
  end

  def create_new_timesheet
    current_timessheet_slot || self.timesheets.create(start_time: DateTime.now) 
  end
end
