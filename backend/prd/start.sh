#!/bin/bash

bundle exec rails db:create

if [ $(ls db/migrate/*.rb 2> /dev/null | wc -l) -gt 0 ]; then
  bundle exec rails db:migrate
else
  bundle exec rails db:schema:load
fi

bundle exec unicorn -p 3000 -c /app/config/unicorn.rb -E production