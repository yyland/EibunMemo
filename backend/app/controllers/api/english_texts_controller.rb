class Api::EnglishTextsController < ApplicationController
  before_action :authenticate_user!

  def index
    @english_texts = EnglishText.all
    render json: @english_texts
  end

  def show
    @english_text = EnglishText.find(params[:id])
    render json: @english_text
  end

  def create

    @english_text = current_user.english_texts.new(english_text_params)

    if @english_text.save
      render json: @english_text, status: :created
    else
      render json: @english_text.errors, status: :unprocessable_entity
    end
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
    params.require(:english_text).permit(:title, :body)
  end
end
