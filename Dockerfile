# Import the ruby kernel.
FROM ruby:2.6.6

# Create a new directory to store the application.
RUN mkdir /task_manager
WORKDIR /task_manager

# Update apt-get and install yarn through it.
RUN apt-get update -qq
RUN apt-get install -y yarn

# Copy the Gemfile and the Gemfile.lock from the current directory to the image.
COPY Gemfile .
COPY Gemfile.lock .

# Copy the package.json from the current directory to the image.
COPY package.json .

# Install all the gems.
RUN bundle install
RUN yarn check --integrity
RUN yarn install --check-files

# Copy the whole app to the image.
COPY . .

# Inform Docker that the container listens on the specified network ports at runtime.
EXPOSE 3000

# Start the main process.
CMD ["rails", "server"]