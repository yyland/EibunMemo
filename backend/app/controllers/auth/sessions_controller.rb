class Auth::SessionsController < ApplicationController
  def index
    if current_user
      is_guest = current_user.guest_uuid.present?
      render json: { is_login: true, is_guest: is_guest, data: current_user }
    else
      render json: { is_login: false, message: 'ユーザーは存在しません' }
    end
  end
end
