require 'rails_helper'

RSpec.describe FieldsController, type: :request do
  it "return a list of fields" do
    get "/fields"

    expect(response.content_type).to eq("application/json; charset=utf-8")
    expect(response).to have_http_status(:ok)

    response_body_parsed = JSON.parse(response.body, symbolize_names: true)

    expect(response_body_parsed).to all(
                               include(
                                 id: an_instance_of(Integer),
                                 name: an_instance_of(String),
                                 area: an_instance_of(Float)
                               )
                             )

    response_body_parsed.each do |field|
      expect(field[:crops]).to match_array(
                                 [
                                   include(year: 2020),
                                   include(year: 2021),
                                   include(year: 2022),
                                   include(year: 2023),
                                   include(year: 2024),
                                 ]
                               )
    end
  end
end
