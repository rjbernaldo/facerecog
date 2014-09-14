class LoginsController < ApplicationController
  protect_from_forgery with: :null_session
  def create
    @login = Login.create(login_params)
    @login.save
    render partial: 'new'
  end

  private

  def login_params
    params.permit(:domain, :username, :password, :user_id)
  end
end