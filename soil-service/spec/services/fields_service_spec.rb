require 'rails_helper'

RSpec.describe FieldsService do

  FIELD_ID_EXISTS = 1
  FIELD_ID_NOT_EXISTS = 99

  describe '#fetch_fields' do
    subject(:fetch_fields) { described_class.instance.fetch_fields }

    it 'returns fields objects' do
      expect(fetch_fields).to all(
                                include(
                                  id: an_instance_of(Integer),
                                  name: an_instance_of(String),
                                  area: an_instance_of(Float)
                                )
                              )
    end

    it 'has crops for 5 years' do
      fetch_fields.each do |field|
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

  # Fetch a single field by ID
  describe '#fetch_field_by_id' do
    subject(:fetch_field_by_id) { described_class.instance.fetch_field_by_id(FIELD_ID_EXISTS) }
    subject(:fetch_field_by_id_error) { described_class.instance.fetch_field_by_id(FIELD_ID_NOT_EXISTS) }

    it 'returns field object' do
      expect(fetch_field_by_id).to include(
                                     id: an_instance_of(Integer),
                                     name: an_instance_of(String),
                                     area: an_instance_of(Float)
                                   )
    end

    it 'has crops for 5 years' do
      expect(fetch_field_by_id[:crops]).to match_array(
                                             [
                                               include(year: 2020),
                                               include(year: 2021),
                                               include(year: 2022),
                                               include(year: 2023),
                                               include(year: 2024),
                                             ]
                                           )
    end

    it 'returns FieldsError exception' do
      expect { fetch_field_by_id_error }.to raise_error(FieldsError::NotFound)
    end
  end
end
