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
    get '/bookings' => 'bookings#index'

    # Sessions
    post '/sessions'               => 'sessions#create'
    get  '/authenticated'          => 'sessions#authenticated'
    delete '/sessions'             => 'sessions#destroy'

    # Properties
    post '/properties' => 'properties#create'
    get '/properties/:user' => 'properties#show'

    # Stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'
  end

end
