class PlantsController < ApplicationController
  before_action :set_plant, only: %i[show update ]
  before_action :authenticate_user, only: %i[create update destroy]
  
  # GET /plants
  def index
    if params[:user_id]
      @user = User.find(params[:user_id])
      render json: @user.plants
    else

      @plants = Plant.all
      render json: @plants
    end
  end

  # GET /plants/1
  def show
    render json: @plant
  end

  # POST /plants
  def create
    @plant = Plant.new(plant_params)
    if @plant.save
      render json: @plant, status: :created, location: @plant
    else
      render json: @plant.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /plants/1
  def update
    if params[:user_id]
      @user = User.find(params[:user_id])
      if !@user.plants.include?(@plant)
        @user.plants << @plant
        render json: @plant
      else
        render json: nil
      end
    elsif @plant.update(plant_params)
      render json: @plant
    else
      render json: @plant.errors, status: :unprocessable_entity
    end
  end

  
    def remove_plant_from_user
       @plant = Plant.find(params[:plant][:id])
       @user = @plant.users.find(params[:user][:id])
       if user
          @plant.users.delete(@user)
       end
  
    end
  

  # DELETE /plants/1
  def destroy
    @plant.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_plant
      @plant = Plant.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def plant_params
      params.require(:plant).permit(:scientific_name, :name, :user_id, :plant_image)
    end

end