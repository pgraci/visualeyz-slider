class Api::SlidersController < ApplicationController
  def index
    render json: Slider.all
  end

  def show
    render json: Slider.find(params[:id])
  end
end
