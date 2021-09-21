Rails.application.routes.draw do

  authenticated  do
    root to: "timesheets#index", as: 'authenticated_root'
  end

  devise_for :users
  
  root to: "home#index"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :timesheets do
    collection do 
      post :clock_in
      post :clock_out
    end
  end

end
