# FROM ruby:2.7.0

# RUN apt-get update -qq

# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
#   && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
#   && apt-get update -qq \
#   && apt-get install -y yarn

# RUN mkdir /myapp
# WORKDIR /myapp

# COPY Gemfile /myapp/Gemfile
# COPY Gemfile.lock /myapp/Gemfile.lock
# RUN gem install bundler -v 2.1.4
# RUN bundle install
# COPY . /myapp

# # Add a script to be executed every time the container starts.
# COPY entrypoint.sh /usr/bin/
# RUN chmod +x /usr/bin/entrypoint.sh

# ENTRYPOINT ["entrypoint.sh"]
# EXPOSE 8080

FROM ruby:alpine

RUN apk update && apk add bash build-base nodejs yarn postgresql-dev tzdata

RUN mkdir /project
WORKDIR /project

COPY Gemfile Gemfile.lock ./
RUN gem install bundler
RUN bundle install
# RUN yarn rebuild node-sass

COPY . .

RUN yarn install --check-files
RUN RAILS_ENV=staging rake webpacker:compile
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
EXPOSE 8080

# CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
