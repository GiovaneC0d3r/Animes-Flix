class ApplicationController < ActionController::Base
  include Authentication
  helper_method :show_navbar?
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  def show_navbar?
    hidden = {
      sessions: [:new, :create],
      users: [:new, :create]
    }

    # Pega o array de actions para o controller atual
    hidden_actions = hidden[controller_name.to_sym] || []

    # Se a action atual estiver na lista, não mostra a navbar
    !hidden_actions.include?(action_name.to_sym)
  end
end
