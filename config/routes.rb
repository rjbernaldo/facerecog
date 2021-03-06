Rails.application.routes.draw do
  get 'welcome/index'
  post 'authenticate/auth_picture'
  post 'authenticate/auth_extension'
  root 'welcome#index'
  resources :users do
    resources :logins, only: :create
  end
end
