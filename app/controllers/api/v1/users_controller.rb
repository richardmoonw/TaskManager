module Api
    module V1
        class UsersController < ApplicationController
            def index
                render json: {
                    greetings: "Hello dog"
                }
            end

            def show 
                email = params[:email]
                render json: {
                    greetings: email
                }
            end
        end
    end
end