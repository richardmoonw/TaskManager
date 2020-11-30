module Api
    module V1
        class TicketsController < ApplicationController
            protect_from_forgery with: :null_session
            before_action :find_ticket, only: [:show, :update, :destroy]
            def index
                @tickets = Ticket.all 
                render json: @tickets
            end
            def show
                render json: @ticket.to_json(include: :comments)
            end
            def create
                @ticket = Ticket.new(ticket_params)
                if @ticket.save
                    render json: @ticket
                else
                    render error:{ error: 'Unable to create ticket.'}, status: 400
                end
            end
            def update
                if @ticket
                    @ticket.update(ticket_params)
                    render json: {message: 'Ticket successfully updated'}, status: 200
                else
                    render error:{ error: 'Unable to update ticket.'}, status: 400
                end
            end
            def destroy
                if @ticket
                    @ticket.destroy
                    render json: {message: 'Ticket successfully deleted'}, status: 200
                else
                    render error:{ error: 'Unable to destroy ticket.'}, status: 400
                end
            end
            private

            def ticket_params
                params.require(:ticket).permit(:title,:description,:priority,:status,:reporter,:assignee,:project_id)
            end
            def find_ticket
                @ticket = Ticket.find(params[:id])
            end
        end
    end
end