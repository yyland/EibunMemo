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

    cookies[:guest_uuid] = { value: guest_uuid, http_only: true, secure: Rails.env.production? }
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
    guest = User.find_by(guest_uuid:)
    return unless guest

    User.transaction do
      guest.english_texts.each do |text|
        text.update!(user_id: user.id) unless text.is_initial_data
      end
    end
    guest.reload
    guest.destroy
  end

  def create_sample_data_for_guest(user)
    SampleData::ENGLISH_TEXTS.each do |text_data|
      text = user.english_texts.find_or_initialize_by(title: text_data[:title])
      text.body = text_data[:body]
      text.is_initial_data = true

      if text.save
        create_memo_words_for_text(text)
      else
        log_error('Error saving EnglishText', text.errors.full_messages)
      end
    end
  end

  def create_memo_words_for_text(text)
    filtered_memo_words = SampleData::MEMO_WORDS.select { |word| word[:text_title] == text.title }

    filtered_memo_words.each do |word|
      memo_word = text.memo_words.find_or_initialize_by(
        word: word[:word],
        start_position: word[:start_position],
        end_position: word[:end_position]
      )
      if memo_word.save
        create_memos_for_memo_word(memo_word, text.title)
      else
        log_error('Error saving MemoWord', memo_word.errors.full_messages)
      end
    end
  end

  def create_memos_for_memo_word(memo_word, text_title)
    filtered_memos = SampleData::MEMOS.select { |memo| memo[:text_title] == text_title && memo[:word_start_position] == memo_word.start_position }

    filtered_memos.each do |memo_data|
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
    devise_parameter_sanitizer.permit(:sign_in, keys: [:username, :password, { session: [:username, :password] }])
  end
end
