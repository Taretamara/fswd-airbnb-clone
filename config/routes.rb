Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id' => 'static_pages#property'
  get '/login' => 'static_pages#login'
  get '/user' => 'static_pages#user'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    # User 
    post '/users' => 'users#create'


    # Bookings
    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    post '/booking/:id/success' => 'bookings#create'
    get '/booking/:user' => 'bookings#show'
    get '/user/bookings' => 'bookings#show_by_user'
    get '/bookings' => 'bookings#index'

    # Sessions
    post '/sessions'               => 'sessions#create'
    get  '/authenticated'          => 'sessions#authenticated'
    delete '/sessions'             => 'sessions#destroy'

    # Properties
    post '/properties' => 'properties#create'
    delete '/properties/:id' => 'properties#destroy'
    get '/properties/:user' => 'properties#show'
    get '/user/properties' => 'properties#show_by_user'
    get '/properties' => 'properties#index'
    post '/properties/update' => 'properties#update'

    # Stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'
  end

end
