module Api
    module V1
        class ProjectsController < ApplicationController
            protect_from_forgery with: :null_session
            def create
                project = review_params

                render json: {
                    name: project[:title]
                }
            end 

            private 
            
            def review_params
                params.require(:project).permit(:title, :creator)
            end
        end
    end
end