module Api
    module V1
        class UsersController < ApplicationController
            protect_from_forgery with: :null_session
            before_action :find_user, only: [:show, :update, :destroy]
            def index
                @users = User.all 
                render json: @users
            end
            def show
                render json: @user.to_json(include: :employee)
            end
            def create
                @user = User.new(user_params)
                
                if @user.save
                    render json: @user
                else
                    render error:{ error: 'Unable to create user.'}, status: 400
                end
            end
            def update
                if @user
                    @user.update(user_params)
                    render json: {message: 'User successfully updated'}, status: 200
                else
                    render error:{ error: 'Unable to update user.'}, status: 400
                end
            end
            def destroy
                if @user
                    @user.destroy
                    render json: {message: 'User successfully deleted'}, status: 200
                else
                    render error:{ error: 'Unable to destroy user.'}, status: 400
                end
            end
            private

            def user_params
                params.require(:user).permit(:email, :password_digest)
            end
            def find_user
                @user = User.find(params[:id])
            end
        end
    end
end