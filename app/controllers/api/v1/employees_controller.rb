module Api
    module V1
        class EmployeesController < ApplicationController
            include CurrentUserConcern
            before_action :require_login
            protect_from_forgery with: :null_session
            before_action :find_employee, only: [:show, :update, :destroy]
            def index
                @employees = Employee.all 
                render json: @employees
            end
            def show
                render json: @employee.to_json(include: :projects)
            end
            def create
                @employee = Employee.new(employee_params)
               
                if @employee.save
                    return head 200
                else
                    return head 400
                end
            end
            def update
                if @employee
                    @employee.update(employee_params)
                    return 200
                else
                    return head 400
                end
            end
            def destroy
                if @employee
                    @employee.destroy
                    render json: {message: 'Employee successfully deleted'}, status: 200
                else
                    render error:{ error: 'Unable to destroy employee.'}, status: 400
                end
            end
            private

            def employee_params
                params.require(:employee).permit(:name, :role, :user_id)
            end
            def find_employee
                @employee = Employee.find(params[:id])
            end
            def require_login
                unless @current_user
                    return head 401
                end
            end
        end
    end
end