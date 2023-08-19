require_relative '../../../db/sample_data'

class Users::SessionsController < Devise::SessionsController
  def create
    super do |user|
      if cookies[:guest_uuid]
        guest = User.find_by(guest_uuid: cookies[:guest_uuid])
        if guest
          # ゲストとして作成されたデータを正規のユーザーに引き継ぐ
          user.english_texts = guest.english_texts
          user.save!

          guest.destroy
        end
        cookies.delete(:guest_uuid)
      end
    end
  end

  def create_guest
    guest_uuid = SecureRandom.uuid
    guest_user = User.find_or_initialize_by(username: "guest_#{guest_uuid}")
    unless guest_user.persisted?
      guest_user.password = Devise.friendly_token
      guest_user.guest_uuid = guest_uuid
      guest_user.save!

      SampleData::ENGLISH_TEXTS.each do |data|
        text = guest_user.english_texts.find_or_initialize_by(title: data[:title])
        text.body = data[:body]
        if text.save
          SampleData::MEMO_WORDS.each do |memo_word_data|
            memo_word = text.memo_words.find_or_initialize_by(
              word: memo_word_data[:word],
              start_position: memo_word_data[:start_position],
              end_position: memo_word_data[:end_position]
            )
            if memo_word.save
              SampleData::MEMOS.each do |memo_data|
                memo = memo_word.memos.find_or_initialize_by(body: memo_data[:body])
                unless memo.save
                  Rails.logger.error "Error saving Memo: #{memo.errors.full_messages.join(', ')}"
                end
              end
            else
              Rails.logger.error "Error saving MemoWord: #{memo_word.errors.full_messages.join(', ')}"
            end
          end
        else
          Rails.logger.error "Error saving EnglishText: #{text.errors.full_messages.join(', ')}"
        end
      end
    end

    # ゲストユーザーから正規ユーザーにデータを引き継ぐためにuuidをクッキーに保存
    cookies[:guest_uuid] = guest_uuid
    sign_in guest_user

    # Devise Token Authの認証ヘッダーを手動で設定
    @resource = guest_user
    new_auth_header = @resource.create_new_auth_token
    response.headers.merge!(new_auth_header)

    render json: { status: 'created', user: guest_user }
    
  rescue StandardError => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
    render json: { status: 'error', message: e.message }, status: :internal_server_error
  end

end
