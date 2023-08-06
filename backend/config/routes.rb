Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations'
  }

  namespace :auth do
    resources :sessions, only: %i[index]
  end

  namespace :api do

    get "health_check", to: "health_checks#index"

    get "english_texts", to: "english_texts#index"
    post "english_texts", to: "english_texts#create"
    get "english_texts/:id", to: "english_texts#show"
    put "english_texts/:id", to: "english_texts#update"
    delete "english_texts/:id", to: "english_texts#destroy"

    get "memo_words", to: "memo_words#index"
    post "memo_words", to: "memo_words#create"
    get "memo_words/:id", to: "memo_words#show"
    get "memo_words/:id/memos", to: "memo_words#memos"
    put "memo_words/:id", to: "memo_words#update"
    delete "memo_words/:id", to: "memo_words#destroy"

    get "memos", to: "memos#index"
    post "memos", to: "memos#create"
    get "memos/:id", to: "memos#show"
    put "memos/:id", to: "memos#update"
    delete "memos/:id", to: "memos#destroy"


  end
end
