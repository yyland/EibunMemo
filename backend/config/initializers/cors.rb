Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3000', 'https://www.eibunmemo.com'

    resource '*',
        headers: :any,
        expose: ["access-token", "expiry", "token-type", "uid", "client", "guest_uuid"],
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: true
  end
end