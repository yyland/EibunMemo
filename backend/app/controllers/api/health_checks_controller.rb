class Api::HealthChecksController < ApplicationController
  def index
    render json: { status: 'OK' }
    
  end
end
