require 'rails_helper'

RSpec.describe User, type: :model do
  it "should require an email address" do
    no_email_user = build :user, email: ""
    expect(no_email_user).not_to be_valid
  end

  it "should accept valid email addresses" do
    addresses = %w[user@foo.com THE_USER@foo.bar.org first.last@foo.jp]
    addresses.each do |address|
      valid_email_user = build :user, email: address
      expect(valid_email_user).to be_valid
    end
  end

  it "should return nil" do
    user = FactoryBot.create(:user)
    expect(user.current_timessheet_slot).to eq(nil)
  end

  it "should create new timesheet" do
    user = FactoryBot.create(:user)
    timesheet = user.create_new_timesheet
    expect(timesheet).to be_an_instance_of(Timesheet)
  end

  it "should return same timesheet" do
    user = FactoryBot.create(:user)
    timesheet = user.create_new_timesheet
    expect(timesheet).to be_an_instance_of(Timesheet)
    timesheet2 = user.create_new_timesheet
    expect(timesheet).to eq(timesheet2)
  end
end
