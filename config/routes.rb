Rails.application.routes.draw do

  authenticated  do
    root to: "home#index", as: 'authenticated_root'
  end

  devise_for :users
  
  root to: "home#index"

  namespace :api do
    namespace :v1 do
      resources :timesheets do
        collection do 
          post :clock_in
          post :clock_out
        end
      end
    end
  end

  get "*path", to: 'home#index', via: :all
end
