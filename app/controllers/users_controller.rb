class UsersController < ApplicationController


  allow_unauthenticated_access only: [:new, :create]
  def new
    redirect_to animes_path if authenticated?
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
       redirect_to new_session_path, notice: "Conta criada com sucesso!"

    else
      if @user.errors[:email_address].any?
        flash.now[:alert] = @user.errors[:email_address].first
      end
      render :new, status: :unprocessable_entity
    end
  end

  def user_params
    params.require(:user).permit(:name, :email_address, :password, :password_confirmation)
  end


end
