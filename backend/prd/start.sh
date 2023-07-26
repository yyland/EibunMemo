#!/bin/bash

if bundle exec rails db:exists; then
  bundle exec rails db:migrate
else
  DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rails db:create db:schema:load
fi

bundle exec unicorn -p 3000 -c /app/config/unicorn.rb -E production