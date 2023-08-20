class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::Cookies

  def create
    super do |user|
      if cookies[:guest_uuid]
        transfer_guest_data_to_user(cookies[:guest_uuid], user)
        cookies.delete(:guest_uuid)
      end
    end
  end

  private

  def transfer_guest_data_to_user(guest_uuid, user)
    guest = User.find_by(guest_uuid:)
    return unless guest

    User.transaction do
      guest.english_texts.each do |text|
        if !text.is_initial_data
          text.update!(user_id: user.id)
        end
      end
    end
    guest.reload
    guest.destroy
  end

  def sign_up_params
    params.require(:registration).permit(:username, :email, :password, :password_confirmation, :name)
  end
end
