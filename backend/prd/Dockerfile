FROM --platform=linux/amd64 ruby:3.1.4
RUN apt-get update -qq && \
  apt-get install -y build-essential \
  libpq-dev \
  nodejs \
  default-mysql-client

RUN mkdir /app
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN gem install bundler
RUN bundle install --without test development
COPY . /app
RUN chmod +x /app/prd/start.sh
EXPOSE 3000

CMD [ "/app/prd/start.sh" ]
