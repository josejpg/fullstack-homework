require 'rails_helper'
require_relative '../mock/data.rb'

RSpec.describe HumusController, type: :request do
  it "calculates a humus for a field" do
    post "/humus", :params => PAYLOAD_OK.to_json

    expect(response.content_type).to eq("application/json; charset=utf-8")
    expect(response).to have_http_status(:ok)

    response_body_parsed = JSON.parse(response.body, symbolize_names: true)

    expect(response_body_parsed).to include(
                          id: an_instance_of(Integer),
                          name: an_instance_of(String),
                          area: an_instance_of(Float),
                          crops: an_instance_of(Array)
                        )
    expect(response_body_parsed[:crops]).to match_array(
                          [
                            include(year: 2020),
                            include(year: 2021),
                            include(year: 2022),
                            include(year: 2023),
                            include(year: 2024),
                          ]
                        )
  end

  it "returns a HumusError::BadRequest" do
    post "/humus", :params => {}

    expect(response.content_type).to eq("application/json; charset=utf-8")
    expect(response).to have_http_status(:bad_request)

    response_body_parsed = JSON.parse(response.body, symbolize_names: true)

    expect(response_body_parsed).to include(
                               error: be_in([true, false]),
                               message: an_instance_of(String),
                             )
    expect(response_body_parsed).to eq(
                               error: true,
                               message: 'Payload is not correct',
                             )
  end

  it "returns a FieldsError::NotFound" do
    post "/humus", :params => PAYLOAD_FIELD_ID_FAIL.to_json

    expect(response.content_type).to eq("application/json; charset=utf-8")
    expect(response).to have_http_status(:not_found)

    response_body_parsed = JSON.parse(response.body, symbolize_names: true)

    expect(response_body_parsed).to include(
                               error: be_in([true, false]),
                               message: an_instance_of(String),
                             )
    expect(response_body_parsed).to eq(
                               error: true,
                               message: 'Field not found',
                             )
  end

  it "returns a CropsError::NotFound" do
    post "/humus", :params => PAYLOAD_CROP_VALUE_FAIL.to_json

    expect(response.content_type).to eq("application/json; charset=utf-8")
    expect(response).to have_http_status(:not_found)

    response_body_parsed = JSON.parse(response.body, symbolize_names: true)

    expect(response_body_parsed).to include(
                               error: be_in([true, false]),
                               message: an_instance_of(String),
                             )
    expect(response_body_parsed).to eq(
                               error: true,
                               message: 'Crop not found',
                             )
  end

  it "returns a CropsError::BadRequest" do
    post "/humus", :params => PAYLOAD_CROP_MISSING_SEASON_FAIL.to_json

    expect(response.content_type).to eq("application/json; charset=utf-8")
    expect(response).to have_http_status(:bad_request)

    response_body_parsed = JSON.parse(response.body, symbolize_names: true)

    expect(response_body_parsed).to include(
                               error: be_in([true, false]),
                               message: an_instance_of(String),
                             )
    expect(response_body_parsed).to eq(
                               error: true,
                               message: 'Some crops are missing',
                             )
  end
end
