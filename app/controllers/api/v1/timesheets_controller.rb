class Api::V1::TimesheetsController < ApplicationController

  before_action :set_timesheet, only: %i[ show edit update destroy ]
  before_action :check_current_timesheet, only: [:new]

  def check_current_timesheet
    if current_user.current_timessheet_slot.present?
      redirect_to timesheets_path, notice: "Please Clock out from current timesheet to create new"
    end
  end

  # GET /timesheets or /timesheets.json
  def index
    @current_timesheet = current_user.current_timessheet_slot
    @timesheets = current_user.timesheets
    render json: {timesheets: @timesheets}
    # respond_to do |format|
    #   format.json {render json: {timesheets: @timesheets}}
    #   format.html
    # end
  end

  def clock_in
    render json: {clock_in: !current_user.create_new_timesheet.errors.any? }
  end

  def clock_out
    if current_timessheet_slot = current_user.current_timessheet_slot
      render json: {clock_in: !current_timessheet_slot.update_end_time}
    else
      render json: {error: "Please check in for new timesheet!"}, status: 406  
    end
  end

  # GET /timesheets/1 or /timesheets/1.json
  def show
  end

  # GET /timesheets/new
  def new
    @timesheet = Timesheet.new
  end

  # GET /timesheets/1/edit
  def edit
  end

  # POST /timesheets or /timesheets.json
  def create
    @timesheet = Timesheet.new(timesheet_params)
    @timesheet.user_id = current_user.id

    respond_to do |format|
      if @timesheet.save
        format.html { redirect_to timesheets_path, notice: "Timesheet was successfully created." }
        format.json { render :show, status: :created, location: @timesheet }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @timesheet.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /timesheets/1 or /timesheets/1.json
  def update
    respond_to do |format|
      if @timesheet.update(timesheet_params)
        format.html { redirect_to timesheets_path, notice: "Timesheet was successfully updated." }
        format.json { render :show, status: :ok, location: @timesheet }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @timesheet.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /timesheets/1 or /timesheets/1.json
  def destroy
    @timesheet.destroy
    respond_to do |format|
      format.html { redirect_to timesheets_url, notice: "Timesheet was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_timesheet
      @timesheet = current_user.timesheets.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def timesheet_params
      params.require(:timesheet).permit(:start_time, :end_time)
    end
end
