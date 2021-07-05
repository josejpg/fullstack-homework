require 'rails_helper'

RSpec.describe CropsService do

  CROP_VALUE_EXISTS = 1
  CROP_VALUE_NOT_EXISTS = 99

  describe '#fetch_all_crops' do
    subject(:fetch_all_crops) { described_class.instance.fetch_all_crops }

    it 'returns all crops' do
      expect(fetch_all_crops).to contain_exactly(
                                   { value: 1, label: 'Spring Wheat', humus_delta: -2 },
                                   { value: 2, label: 'Winter Wheat', humus_delta: -1 },
                                   { value: 3, label: 'Red Clover', humus_delta: 2 },
                                   { value: 4, label: 'White Clover', humus_delta: 1 },
                                   { value: 5, label: 'Broad Bean', humus_delta: 3 },
                                   { value: 6, label: 'Oats', humus_delta: 0 }
                                 )
    end

    # Fetch a single crop by Value
    describe '#fetch_field_by_id' do
      subject(:fetch_crop_by_value) { described_class.instance.fetch_crop_by_value(CROP_VALUE_EXISTS) }
      subject(:fetch_crop_by_value_error) { described_class.instance.fetch_crop_by_value(CROP_VALUE_NOT_EXISTS) }

      it 'returns crop object' do
        expect(fetch_crop_by_value).to include(
                                         value: an_instance_of(Integer),
                                         label: an_instance_of(String),
                                         humus_delta: an_instance_of(Integer)
                                       )
      end

      it 'has exactly values' do
        expect(fetch_crop_by_value).to contain_exactly(
                                         [:humus_delta, -2],
                                         [:label, 'Spring Wheat'],
                                         [:value, 1]
                                       )
      end

      it 'has not exactly values' do
        expect(fetch_crop_by_value).to_not contain_exactly(
                                             [:value, 1],
                                             [:label, 'Spring Wheat']
                                           )
      end

      it 'returns CropsError exception' do
        expect { fetch_crop_by_value_error }.to raise_error(CropsError::NotFound)
      end
    end
  end
end
