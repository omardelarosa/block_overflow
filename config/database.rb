# establishes our connection to the DB and other settings
ActiveRecord::Base.establish_connection(
    :adapter => "postgresql",
    :host => "localhost",
    :username => "omardelarosa",
    :database => "lambda_feed",
    :encoding => "utf8"
  )