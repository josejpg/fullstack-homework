require 'rails_helper'

RSpec.describe HumusService do

  FIELD_ID_OK = 1
  FIELD_ID_FAILS = 99

  CROP_VALUE_OK = [
    {
      "year": 2020,
      "crop": {
        "value": 2,
        "label": "Winter Wheat",
        "humus_delta": -1
      }
    },
    {
      "year": 2021,
      "crop": {
        "value": 6,
        "label": "Oats",
        "humus_delta": 0
      }
    },
    {
      "year": 2022,
      "crop": {
        "value": 2,
        "label": "Winter Wheat",
        "humus_delta": -1
      }
    },
    {
      "year": 2023,
      "crop": {
        "value": 6,
        "label": "Oats",
        "humus_delta": 0
      }
    },
    {
      "year": 2024,
      "crop": {
        "value": 2,
        "label": "Winter Wheat",
        "humus_delta": -1
      }
    }
  ]
  CROP_VALUE_FAILS = [
    {
      "year": 2020,
      "crop": {
        "value": 9999,
        "label": "Winter Wheat",
        "humus_delta": -1
      }
    },
    {
      "year": 2021,
      "crop": {
        "value": 6,
        "label": "Oats",
        "humus_delta": 0
      }
    },
    {
      "year": 2022,
      "crop": {
        "value": 2,
        "label": "Winter Wheat",
        "humus_delta": -1
      }
    },
    {
      "year": 2023,
      "crop": {
        "value": 6,
        "label": "Oats",
        "humus_delta": 0
      }
    },
    {
      "year": 2024,
      "crop": {
        "value": 2,
        "label": "Winter Wheat",
        "humus_delta": -1
      }
    }
  ]
  CROP_MISSING_SEASSON_FAILS = [
    {
      "year": 2021,
      "crop": {
        "value": 6,
        "label": "Oats",
        "humus_delta": 0
      }
    },
    {
      "year": 2022,
      "crop": {
        "value": 2,
        "label": "Winter Wheat",
        "humus_delta": -1
      }
    },
    {
      "year": 2023,
      "crop": {
        "value": 6,
        "label": "Oats",
        "humus_delta": 0
      }
    },
    {
      "year": 2024,
      "crop": {
        "value": 2,
        "label": "Winter Wheat",
        "humus_delta": -1
      }
    }
  ]

  PAYLOAD_OK = {
    "id": FIELD_ID_OK,
    "name": "Mäeotsa",
    "area": 0.93,
    "crops": CROP_VALUE_OK
  }

  PAYLOAD_FIELD_ID_FAIL = {
    "id": FIELD_ID_FAILS,
    "name": "Mäeotsa",
    "area": 0.93,
    "crops": CROP_VALUE_OK
  }

  PAYLOAD_CROP_VALUE_FAIL = {
    "id": FIELD_ID_OK,
    "name": "Mäeotsa",
    "area": 0.93,
    "crops": CROP_VALUE_FAILS
  }

  PAYLOAD_CROP_MISSING_SEASSON_FAIL = {
    "id": FIELD_ID_OK,
    "name": "Mäeotsa",
    "area": 0.93,
    "crops": CROP_MISSING_SEASSON_FAILS
  }

  describe '#calculate' do
    subject(:calculate) { described_class.instance.calculate(PAYLOAD_OK.to_json) }
    subject(:calculate_payload_fail) { described_class.instance.calculate() }
    subject(:calculate_field_fail) { described_class.instance.calculate(PAYLOAD_FIELD_ID_FAIL.to_json) }
    subject(:calculate_crop_fail) { described_class.instance.calculate(PAYLOAD_CROP_VALUE_FAIL.to_json) }
    subject(:calculate_crop_missing_seasson_fail) { described_class.instance.calculate(PAYLOAD_CROP_MISSING_SEASSON_FAIL.to_json) }

    it 'returns field object' do
      expect(calculate).to include(
                             id: an_instance_of(Integer),
                             name: an_instance_of(String),
                             area: an_instance_of(Float),
                             crops: an_instance_of(Array)
                           )
    end

    it 'has crops for 5 years' do
      expect(calculate[:crops]).to match_array(
                                     [
                                       include(year: 2020),
                                       include(year: 2021),
                                       include(year: 2022),
                                       include(year: 2023),
                                       include(year: 2024),
                                     ]
                                   )
    end

    it 'returns HumusError::BadRequest exception' do
      expect { calculate_payload_fail }.to raise_error(HumusError::BadRequest)
    end

    it 'returns FieldsError::NotFound exception' do
      expect { calculate_field_fail }.to raise_error(FieldsError::NotFound)
    end

    it 'returns CropsError::NotFound exception' do
      expect { calculate_crop_fail }.to raise_error(CropsError::NotFound)
    end

    it 'returns CropsError::BadRequest exception' do
      expect { calculate_crop_missing_seasson_fail }.to raise_error(CropsError::BadRequest)
    end
  end
end
