class HumusController < ActionController::Base
  skip_before_action :verify_authenticity_token, :only => [:update]
  def update
    render json: HumusService.instance.calculate(request.body.read)
    rescue FieldsError
      render json: {
        error: true,
        message: 'Field not found',
      }, status: 404
    rescue CropsError
      render json: {
        error: true,
        message: 'Crop not found',
      }, status: 404
    rescue HumusError
      render json: {
        error: true,
        message: 'Humus error',
      }, status: 400
  end
end

