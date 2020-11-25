Rails.application.config.middleware.insert_before 0, Rack::Cors do
    # Local environment
    allow do
        origins "http://localhost:3000"
        resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
    end

    # Real environment
    allow do
        origins "https://forkie.heroku.com:3000"
        resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
    end
end