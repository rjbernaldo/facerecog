require 'base64'
require 'unirest'

class AuthenticateController < ApplicationController
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

  def auth_picture
    def postunirest(handler, data=Hash.new)
      data[:apikey]=ENV['API_KEY']
      response=Unirest.post "http://api.idolondemand.com/1/api/sync/#{handler}/v1",
                        headers:{ "Accept" => "application/json" },
                        parameters: data
      response.body
    end


    data_url = params[:pic_url]
    base=Base64.decode64(data_url)
    File.open('new_image.png', 'wb') { |f| f.write(base)}

    @face = postunirest('recognizefaces',{:file=>open('new_image.png','rb'),:indexes=>"#{ENV['DB_NAME']}"})
    user_id = User.find_by_uniquename(@face['face'][0]["uniquename"]).id
    session[:id] = user_id
    render :json => user_id
  end

  def auth_extension
    def postunirest(handler, data=Hash.new)
      data[:apikey]=ENV['API_KEY']
      response=Unirest.post "http://api.idolondemand.com/1/api/sync/#{handler}/v1",
                        headers:{ "Accept" => "application/json" },
                        parameters: data
      response.body
    end

    data_url = params[:image]
    base=Base64.decode64(data_url)
    File.open('ext_image.png', 'wb') { |f| f.write(base) }

    respond_to do |format|
      format.json { render json: postunirest('recognizefaces',{:file=>open('ext_image.png','rb'),:indexes=>"nerf"}) }
    end
  end
end
