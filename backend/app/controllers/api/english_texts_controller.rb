class Api::EnglishTextsController < ApplicationController
  
  def index
    @english_texts = EnglishText.all
    render json: @english_texts
  end

  def show
    @english_text = EnglishText.find(params[:id])
    render json: @english_text
  end

  def create
    @english_text = EnglishText.create(english_text_params)
    render json: @english_text
  end

  def update
    @english_text = EnglishText.find(params[:id])
    @english_text.update(english_text_params)
    render json: @english_text
  end

  def destroy
    @english_text = EnglishText.find(params[:id])
    @english_text.destroy
    render json: @english_text
  end

  private

  def english_text_params
    params.require(:english_text).permit(:title, :text)
  end
end
