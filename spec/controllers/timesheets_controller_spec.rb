require 'rails_helper'

RSpec.describe TimesheetsController, type: :controller do
  describe "GET 'index'" do
    login_user
    it "should return blank array" do
      get :index, format: :json
      expect(response).to have_http_status(:ok)
      timesheets = JSON.parse(response.body)['timesheets']
      expect(timesheets).to eq([])
    end
    it "should return a timesheet in response after check in" do
      post :clock_in
      get :index, format: :json
      expect(response).to have_http_status(:ok)
      timesheets = JSON.parse(response.body)['timesheets']
      expect(timesheets.size).to eq(1)
    end
  end
  
  describe "POST 'clock_in'" do
    login_user
    it "will create new timesheet with start time" do
      expect {
        post :clock_in
      }.to change(Timesheet, :count).by(1)
      expect(response).to have_http_status(:ok)
      clock_in = JSON.parse(response.body)['clock_in']
      expect(clock_in).to eq(true)
    end
    it "should not create new timesheet" do
      expect {
        post :clock_in
      }.to change(Timesheet, :count).by(1)
      timesheet_count = Timesheet.count
      post :clock_in
      expect(Timesheet.count).to eq(timesheet_count)
      expect(response).to have_http_status(:ok)
      clock_in = JSON.parse(response.body)['clock_in']
      expect(clock_in).to eq(true)
    end
  end

  describe "POST 'clock_out'" do
    login_user
    it "should respond with error without timesheet" do
      post :clock_out
      expect(response).to have_http_status(406)
      error_msg = JSON.parse(response.body)['error']
      expect(error_msg).to eq("Please check in for new timesheet!")
    end
    it "should respond with success" do
      expect {
        post :clock_in
      }.to change(Timesheet, :count).by(1)
      post :clock_out
      expect(response).to have_http_status(200)
      error_msg = JSON.parse(response.body)['clock_in']
      expect(error_msg).to eq(false)
    end
  end

end
