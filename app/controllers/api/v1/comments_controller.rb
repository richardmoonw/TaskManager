module Api
    module V1
        class CommentsController < ApplicationController
            protect_from_forgery with: :null_session
            before_action :find_comment, only: [:show, :update, :destroy]
            def index
                @comments = Comment.all 
                render json: @comments
            end
            def show
                render json: @comment
            end
            def create
                @comment = Comment.new(comment_params)
                if @comment.save
                    render json: @comment
                else
                    render error:{ error: 'Unable to create comment.'}, status: 400
                end
            end
            def update
                if @comment
                    @comment.update(comment_params)
                    render json: {message: 'Comment successfully updated'}, status: 200
                else
                    render error:{ error: 'Unable to update comment.'}, status: 400
                end
            end
            def destroy
                if @comment
                    @comment.destroy
                    render json: {message: 'Comment successfully deleted'}, status: 200
                else
                    render error:{ error: 'Unable to destroy comment.'}, status: 400
                end
            end
            private

            def comment_params
                params.require(:comment).permit(:comment,:commenter,:ticket_id)
                # params.require(:comment).permit(:comment,:commenter)
            end
            def find_comment
                @comment = Comment.find(params[:id])
            end
        end
    end
end