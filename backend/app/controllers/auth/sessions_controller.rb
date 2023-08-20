require_relative '../../../db/sample_data'

class Auth::SessionsController < DeviseTokenAuth::SessionsController
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::Cookies
  before_action :configure_sign_in_params

  def index
    if current_user
      is_guest = current_user.guest_uuid.present?
      render json: { is_login: true, is_guest:, data: current_user }
    else
      render json: { is_login: false, message: 'ユーザーは存在しません' }
    end
  end

  def create
    super do |user|
      if cookies[:guest_uuid]
        transfer_guest_data_to_user(cookies[:guest_uuid], user)
        cookies.delete(:guest_uuid)
      end
    end
  end

  def create_guest
    username_suffix = SecureRandom.hex(4)
    guest_uuid = SecureRandom.uuid
    guest_user = User.find_or_initialize_by(username: "guest_#{username_suffix}")

    unless guest_user.persisted?
      guest_user.password = Devise.friendly_token
      guest_user.guest_uuid = guest_uuid
      guest_user.email = "guest_#{username_suffix}@eibunmemo.com"
      guest_user.save!
      create_sample_data_for_guest(guest_user)
    end

    cookies[:guest_uuid] = guest_uuid
    sign_in guest_user

    @resource = guest_user
    new_auth_header = @resource.create_new_auth_token
    response.headers.merge!(new_auth_header)

    render json: { status: 'created', user: guest_user }
  rescue StandardError => e
    log_error('An error occurred', e.message)
    render json: { status: 'error', message: e.message }, status: :internal_server_error
  end

  private

  def transfer_guest_data_to_user(guest_uuid, user)
    guest = User.find_by(guest_uuid: guest_uuid)
    return unless guest

    # TODO: 初期データは引き継がないようにする
    User.transaction do
      guest.english_texts.each do |text|
        updated_text = text.update!(user_id: user.id)
      end
    end
    guest.reload
    guest.destroy
  end

  def create_sample_data_for_guest(user)
    SampleData::ENGLISH_TEXTS.each do |data|
      text = user.english_texts.find_or_initialize_by(title: data[:title])
      text.body = data[:body]
      if text.save
        create_memo_words_for_text(text)
      else
        log_error('Error saving EnglishText', text.errors.full_messages)
      end
    end
  end

  def create_memo_words_for_text(text)
    SampleData::MEMO_WORDS.each do |memo_word_data|
      memo_word = text.memo_words.find_or_initialize_by(
        word: memo_word_data[:word],
        start_position: memo_word_data[:start_position],
        end_position: memo_word_data[:end_position]
      )
      if memo_word.save
        create_memos_for_memo_word(memo_word)
      else
        log_error('Error saving MemoWord', memo_word.errors.full_messages)
      end
    end
  end

  def create_memos_for_memo_word(memo_word)
    SampleData::MEMOS.each do |memo_data|
      memo = memo_word.memos.find_or_initialize_by(body: memo_data[:body])
      log_error('Error saving Memo', memo.errors.full_messages) unless memo.save
    end
  end

  def log_error(message, errors)
    error_messages = errors.respond_to?(:join) ? errors.join(', ') : errors.to_s
    Rails.logger.error "#{message}: #{error_messages}"
  end


  protected

  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:username, :password, session: [:username, :password]])
  end
end
