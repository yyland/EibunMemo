class Api::MemosController < ApplicationController
  before_action :authenticate_user!
  before_action :set_memo, only: [:show, :update, :destroy]
  before_action :ensure_user_owns_memo, only: [:show, :update, :destroy]

  def index
    @memos = Memo.joins(memo_word: :english_text).where(english_texts: { user_id: current_user.id })
    render json: @memos
  end

  def show
    render json: @memo
  end

  def create
    @memo_word = MemoWord.find(memo_params[:memo_word_id])
    @memo = @memo_word.memos.new(memo_params)
    if @memo.save
      render json: @memo, status: :created
    else
      render json: @memo.errors, status: :unprocessable_entity
    end
  end

  def update
    @memo.update(memo_params)
    render json: @memo
  end

  def destroy
    @memo.destroy
    render status: :no_content
  end

  private

  def set_memo
    @memo = Memo.find_by(id: params[:id])
  end

  def ensure_user_owns_memo
    return if @memo && @memo.memo_word.english_text.user == current_user

    render status: :not_found
    nil
  end

  def memo_params
    params.require(:memo).permit(:memo_word_id, :body)
  end
end
