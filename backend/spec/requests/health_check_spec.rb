require 'rails_helper'

RSpec.describe 'health_check', type: :request do
  describe 'GET /' do
    it 'HTTP ステータス 200 を返す' do
      get '/api/health_check'
      expect(response).to have_http_status(200)
    end
  end
end