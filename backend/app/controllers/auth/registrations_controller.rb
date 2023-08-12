class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  def sign_up_params
    params.require(:registration).permit(:username, :email, :password, :password_confirmation, :name)
  end
end
