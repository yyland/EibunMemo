class Api::MemosController < ApplicationController

  def index
    @memos = Memo.all
    render json: @memos
  end

  def show
    @memo = Memo.find(params[:id])
    render json: @memo
  end

  def create
    @memo = Memo.create(memo_params)
    render json: @memo
  end

  def update
    @memo = Memo.find(params[:id])
    @memo.update(memo_params)
    render json: @memo
  end

  def destroy
    @memo = Memo.find(params[:id])
    @memo.destroy
    render json: @memo
  end

  private

  def memo_params
    params.require(:memo).permit(:memo_word_id, :memo)
  end

end
