Rails.application.routes.draw do
  root to: 'welcome#index'
  get 'welcome/index'
  get '/api/v1/cloudword/freqs'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
