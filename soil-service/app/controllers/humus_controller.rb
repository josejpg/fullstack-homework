class HumusController < ActionController::Base
  skip_before_action :verify_authenticity_token, :only => [:create]
  def create
    render json: HumusService.instance.calculate(request.body.read)
    rescue FieldsError::NotFound
      render json: {
        error: true,
        message: 'Field not found',
      }, status: 404
    rescue CropsError::NotFound
      render json: {
        error: true,
        message: 'Crop not found',
      }, status: 404
    rescue CropsError::BadRequest
      render json: {
        error: true,
        message: 'Some crops are missing',
      }, status: 400
    rescue HumusError::BadRequest
      render json: {
        error: true,
        message: 'Payload is not correct',
      }, status: 400
  end
end

