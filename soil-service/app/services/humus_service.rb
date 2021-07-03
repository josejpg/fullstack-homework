class HumusService
  include Singleton

  INITIAL_HUMUS = 0
  CROP_CONSECUTIVE_YEAR_COEFFICIENT = 1.3

  # Calculate humus balance for a field object
  def calculate(payload)
    Logger.instance.debug("calculate payload => #{payload}")
    return unless payload.present?
    field = JSON.parse payload
    Rails.logger.debug("calculate field => #{field.to_s}")
    return HumusError unless field.present?

    field.humus_balance = calculate_by_field_id field["id"]
    field
  end

  # Calculate humus balance by a field ID
  def calculate_by_field_id(field_id)
    Rails.logger.debug("calculate_by_field_id field_id => #{field_id.to_s}")
    field = FieldsService.instance.fetch_field_by_id field_id
    Rails.logger.debug("calculate_by_field_id fetch_field_by_id => #{field.to_s}")
    field[:crops] = calculate_deltas field[:crops]

    calculate_humus_balance field
  end

  # Calculate deltas for a crops list
  def calculate_deltas(crops)
    crops.each_with_index.map do |yearly_crop, i|
      curr_crop = yearly_crop[:crop].dup
      Rails.logger.debug("calculate_deltas curr_crop/i => #{curr_crop.to_s} // #{i}")
      delta = curr_crop[:humus_delta]
      if i > 0
        prev_yearly_crop = crops[i-1]
        Rails.logger.debug("calculate_deltas prev_yearly_crop crop/i => #{prev_yearly_crop.to_s} // #{i-1}")
        Rails.logger.debug("calculate_deltas prev_yearly_crop.nil => #{prev_yearly_crop.nil?}")
        unless prev_yearly_crop.nil?
          prev_crop = prev_yearly_crop[:crop]
          # If current crop is the same as previous,
          # the current delta is the previous one multiplied by the coefficient
          #
          Rails.logger.debug("calculate_deltas prev_crop value // humus_delta => #{prev_crop[:value].to_s} // #{prev_crop[:humus_delta]}")
          Rails.logger.debug("calculate_deltas curr_crop value // humus_delta => #{curr_crop[:value].to_s} // #{curr_crop[:humus_delta]}")
          if prev_crop[:value] === curr_crop[:value]
            Rails.logger.debug("calculate_deltas prev_crop[:humus_delta] * CROP_CONSECUTIVE_YEAR_COEFFICIENT => #{prev_crop[:humus_delta] * CROP_CONSECUTIVE_YEAR_COEFFICIENT}")
            delta = prev_crop[:humus_delta] * CROP_CONSECUTIVE_YEAR_COEFFICIENT
          end
        end
      end
      curr_crop[:humus_delta] = delta.to_f.round(2)
      yearly_crop[:crop] = curr_crop
      yearly_crop
    end
  end

  # Calculate humus balance for a field
  def calculate_humus_balance(field)
    field[:crops].reduce(INITIAL_HUMUS) do |balance, yearly_crop|
      balance + yearly_crop[:crop][:humus_delta]
    end
  end
end