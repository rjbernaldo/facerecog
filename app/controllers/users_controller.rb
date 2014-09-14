class UsersController < ApplicationController
  def index

  end

  def show
    if session[:id].to_i != params[:id].to_i
      redirect_to root_path
    end
    @id = params[:id]
    @uniquename = User.find(@id).uniquename
    @new_login = Login.new
    @logins = Login.where(user_id: @id)
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end
end