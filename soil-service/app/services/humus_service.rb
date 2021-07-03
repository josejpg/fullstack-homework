class HumusService
  include Singleton

  INITIAL_HUMUS = 0
  CROP_CONSECUTIVE_YEAR_COEFFICIENT = 1.3

  # Calculate humus balance for a field object
  def calculate(payload)
    field = JSON.parse(payload, object_class: OpenStruct)
    check_field_id = FieldsService.instance.fetch_field_by_id field[:id]
    raise FieldsError unless field.present? && !field.nil? && !field.empty?
    field["crops"] = calculate_deltas field[:crops]
    field["humus_balance"] = calculate_humus_balance field
    field.as_json["table"]
  end

  # Calculate humus balance by a field ID
  def calculate_by_field_id(field_id)
    field = FieldsService.instance.fetch_field_by_id field_id
    field[:crops] = calculate_deltas field[:crops]

    calculate_humus_balance field
  end

  # Calculate deltas for a crops list
  def calculate_deltas(crops)
    crops.each_with_index.map do |yearly_crop, i|
      curr_crop = yearly_crop[:crop].dup
      check_crop_id = CropsService.instance.fetch_crop_by_value curr_crop[:value]
      if i > 0
        prev_yearly_crop = crops[i-1]
        unless prev_yearly_crop.nil?
          prev_crop = prev_yearly_crop[:crop]
          # If current crop is the same as previous,
          # the current delta is the previous one multiplied by the coefficient
          #
          if prev_crop[:value] === curr_crop[:value]
            curr_crop[:humus_delta] = prev_crop[:humus_delta] * CROP_CONSECUTIVE_YEAR_COEFFICIENT
          end
        end
      end
      curr_crop[:humus_delta] = curr_crop[:humus_delta].to_f.round(2)
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