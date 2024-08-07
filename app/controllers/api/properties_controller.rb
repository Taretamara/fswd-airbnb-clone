module Api
  class PropertiesController < ApplicationController

    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found unless @properties

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found unless @property

      render 'api/properties/show', status: :ok
    end
  end

  def create
    @property = Property.new(property_params)
      if @property.save
        render json: @property, status: :created
      else
        render json: @property.errors, status: :unproccessable_entity
      end
  end

  private

  def property_params
    params.require(:property).permit(:name, :description, :price, images: [])
  end
end
