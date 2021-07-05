require 'rails_helper'

RSpec.describe CropsController, type: :request do
  it "return a list of crops" do
    get "/crops"

    expect(response.content_type).to eq("application/json; charset=utf-8")
    expect(response).to have_http_status(:ok)

    response_body_parsed = JSON.parse(response.body, symbolize_names: true)

    expect(response_body_parsed).to contain_exactly(
                                      { value: 1, label: 'Spring Wheat', humus_delta: -2 },
                                      { value: 2, label: 'Winter Wheat', humus_delta: -1 },
                                      { value: 3, label: 'Red Clover', humus_delta: 2 },
                                      { value: 4, label: 'White Clover', humus_delta: 1 },
                                      { value: 5, label: 'Broad Bean', humus_delta: 3 },
                                      { value: 6, label: 'Oats', humus_delta: 0 }
                                    )
  end
end
