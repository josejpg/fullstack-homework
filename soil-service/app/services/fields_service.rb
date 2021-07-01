# Here we simulate a database connection with Fields
class FieldsService
  include Singleton

  FIELDS = [
    {
      id: 1,
      name: 'Mäeotsa',
      area: 0.93,
      crops: [
        { year: 2020, crop: CropsService::WINTER_WHEAT },
        { year: 2021, crop: CropsService::OATS },
        { year: 2022, crop: CropsService::WINTER_WHEAT },
        { year: 2023, crop: CropsService::OATS },
        { year: 2024, crop: CropsService::WINTER_WHEAT },
      ],
      hummus_balance: HumusService.instance.calculate_to_field(1)
    },
    {
      id: 2,
      name: 'Tiigimanu',
      area: 3.14,
      crops: [
        { year: 2020, crop: CropsService::SPRING_WHEAT },
        { year: 2021, crop: CropsService::OATS },
        { year: 2022, crop: CropsService::RED_CLOVER },
        { year: 2023, crop: CropsService::WINTER_WHEAT },
        { year: 2024, crop: CropsService::BROAD_BEAN },
      ],
      hummus_balance: HumusService.instance.calculate_to_field(2)
    },
    {
      id: 3,
      name: 'Künkatagune',
      area: 5.18,
      crops: [
        { year: 2020, crop: CropsService::SPRING_WHEAT },
        { year: 2021, crop: CropsService::SPRING_WHEAT },
        { year: 2022, crop: CropsService::SPRING_WHEAT },
        { year: 2023, crop: CropsService::SPRING_WHEAT },
        { year: 2024, crop: CropsService::SPRING_WHEAT },
      ],
      hummus_balance: HumusService.instance.calculate_to_field(3)
    },
  ]

  # Fetch all the fields
  def fetch_fields
    FIELDS
  end

  # Retrieve a field by its ID
  def fetch_field_by_id(field_id)
    field = FIELDS.select { |field| field.id === field_id }
    return field unless field.nil?
    raise FieldsError
  end
end
