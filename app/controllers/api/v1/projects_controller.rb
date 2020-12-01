module Api
    module V1
        class ProjectsController < ApplicationController
            include CurrentUserConcern
            # before_action :require_login
            protect_from_forgery with: :null_session
            before_action :find_project, only: [:show, :update, :destroy]
            def index
                @projects = Project.all 
                render json: @projects
            end
            def show
                render json: @project.to_json(include: [:employees, :tickets])

            end
            def create
                @project = Project.new(project_params)
                params[:employee_ids].each do |employee|

                    @project.teams.build(:employee_id => employee)
                    
                  end
                if @project.save
                    render json: @project
                else
                    render error:{ error: 'Unable to create project.'}, status: 400
                end
            end
            def update
                if @project
                    @project.update(project_params)
                    @project.teams.delete_all
                    params[:employee_ids].each do |employee|

                        @project.teams.create(:employee_id => employee)
                        
                    end
                    render json: {message: 'Project successfully updated'}, status: 200
                else
                    render error:{ error: 'Unable to update project.'}, status: 400
                end
            end
            def destroy
                if @project
                    @project.destroy
                    render json: {message: 'Project successfully deleted'}, status: 200
                else
                    render error:{ error: 'Unable to destroy project.'}, status: 400
                end
            end
            private
            
            def project_params
                params.require(:project).permit(:name,:description,employee_ids:[])
            end
            def find_project
                @project = Project.find(params[:id])
            end
            def require_login
                unless @current_user
                    return head 401
                end
            end
        end
    end
end