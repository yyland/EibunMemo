class Api::MemoWordsController < ApplicationController

  def index
    @memo_words = MemoWord.all
    render json: @memo_words
  end

  def show
    @memo_word = MemoWord.find(params[:id])
    render json: @memo_word
  end

  def create
    @memo_word = MemoWord.create(memo_word_params)
    render json: @memo_word
  end

  def update
    @memo_word = MemoWord.find(params[:id])
    @memo_word.update(memo_word_params)
    render json: @memo_word
  end

  def destroy
    @memo_word = MemoWord.find(params[:id])
    @memo_word.destroy
    render json: @memo_word
  end

  def memos
    @memo_word = MemoWord.find(params[:id])
    @memos = @memo_word.memos
    render json: @memos
  end

  private

  def memo_word_params
    params.require(:memo_word).permit(:english_text_id, :word, :start_position, :end_position)
  end

end
