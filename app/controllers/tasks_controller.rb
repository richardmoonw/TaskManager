class TasksController < ApplicationController
    before_action :authenticate_user!
    def index
        render json: {"nombre": "perrito"}
    end
end