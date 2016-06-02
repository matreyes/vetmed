require "rubygems"
require "sinatra"
require "sinatra/contrib/all"
require "hamlit"
require "pony"
require 'pry'

DOCS ||= YAML.load_file('./docs.yml')
EMAIL_OPTIONS ||= {
  enable_starttls_auto: true,
  address: 'smtp.gmail.com',
  port: '587',
  user_name: 'vetlinea@gmail.com',
  password: ENV['GMAIL_PASS'],
  authentication: :plain
}

class Vetmed < Sinatra::Base
  set :haml, {format: :html5, escape_html: false}

  get "/" do
    haml :index, locals: {docs: DOCS}
  end

  post "/send_document" do
    doc = params[:document]
    email = params[:email]

    if email.present?
      File.open('../emails.txt', 'a') do |f|
        f.puts email
      end
    end

    { file: "/docs/pdf/#{DOCS[doc]['pdf']}" }.to_json

  end

  post "/contact" do
    Pony.mail(to: 'piachangl@gmail.com',
      via: :smtp,
      via_options: EMAIL_OPTIONS,
      subject: params["subject"],
      reply_to: params['email'],
      body: "#{params['message']}\n\nPor: #{params['name']} - #{params['email']}\n\n"
    )
    redirect to('/')
  end

end
