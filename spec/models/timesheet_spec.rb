require 'rails_helper'

RSpec.describe Timesheet, type: :model do
  it "should give validation error for end date" do
    user = FactoryBot.create(:user)
    new_timesheet = build :timesheet, end_time: DateTime.now, start_time: DateTime.now + 2.seconds,user_id: user.id
    expect(new_timesheet).not_to be_valid
  end

  it "should give validation error for start date" do
    user = FactoryBot.create(:user)
    new_timesheet = build :timesheet, end_time: DateTime.now,user_id: user.id
    expect(new_timesheet).not_to be_valid
  end

  it "should create timesheet with valid data" do
    user = FactoryBot.create(:user)
    new_timesheet = build :timesheet, start_time: DateTime.now, end_time: DateTime.now + 30.minutes,user_id: user.id
    expect(new_timesheet).to be_valid
    expect(new_timesheet.save).to eq(true)
  end

end
