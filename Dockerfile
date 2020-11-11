# Import the ruby kernel.
FROM ruby:2.6.6

# Create a new directory to store the application.
RUN mkdir /task_manager
WORKDIR /task_manager

# Install Node.js from apt-get
RUN apt-get update 
RUN apt-get -y install nodejs npm

# Remove cmdtest and yarn if they exist:
# When yarn is installed thorugh apt-get, it is not really installed. 
# Instead of that, cmdtest is obtained, so if we try to use yarn after this,
# it won't work. 
RUN apt remove cmdtest
RUN apt remove yarn

# Install a clean version of yarn without cmdtest.
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo 'deb https://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get -y install yarn

# Copy the Gemfile and the Gemfile.lock from the current directory to the image.
COPY Gemfile .
COPY Gemfile.lock .

# Copy the package.json from the current directory to the image.
COPY package.json .

# Install all the gems.
RUN bundle install

# Install all the node packages.
RUN yarn install

# Copy the whole app to the image.
COPY . .

RUN rails db:migrate

# Inform Docker that the container listens on the specified network ports at runtime.
EXPOSE 3000

# Start the main process.
CMD ["rails", "server"]