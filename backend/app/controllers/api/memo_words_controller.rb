class Api::MemoWordsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_memo_word, only: [:show, :update, :destroy, :memos]
  before_action :ensure_user_owns_memo_word, only: [:show, :update, :destroy, :memos]

  def index
    @memo_words = MemoWord.joins(:english_text).where(english_texts: { user_id: current_user.id })
    render json: @memo_words
  end  

  def show
    render json: @memo_word
  end

  def create
    @english_text = current_user.english_texts.find_by(id: memo_word_params[:english_text_id])
    unless @english_text
      render status: :not_found
      return
    end

    @memo_word = @english_text.memo_words.new(memo_word_params)
    if @memo_word.save
      render json: @memo_word, status: :created
    else
      render json: @memo_word.errors, status: :unprocessable_entity
    end
  end

  def update
    if @memo_word.update(memo_word_params)
      render json: @memo_word
    else
      render json: @memo_word.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @memo_word.destroy
    render status: :no_content
  end

  def memos
    @memos = @memo_word.memos
    render json: @memos
  end

  private

  def set_memo_word
    @memo_word = MemoWord.find_by(id: params[:id])
  end

  def ensure_user_owns_memo_word
    unless current_user.english_texts.include?(@memo_word.english_text)
      render status: :forbidden
    end
  end

  def memo_word_params
    params.require(:memo_word).permit(:english_text_id, :word, :start_position, :end_position, :is_memory_list)
  end
end