class UsersController < ApplicationController
  def index

  end

  def show
    @id = params[:id]
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