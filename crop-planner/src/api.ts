import { Crop, Field } from './types'

const SOIL_SERVICE_URL = 'http://localhost:3000'

export const fetchFields = async (): Promise<Array<Field>> =>
  await fetch(`${SOIL_SERVICE_URL}/fields`).then(response => response.json())

export const fetchCrops = async (): Promise<Array<Crop>> =>
  await fetch(`${SOIL_SERVICE_URL}/crops`).then(response => response.json())

export const fetchHumus = async (field: Field): Promise<Field> => {
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(field)
    };
    return await fetch(`${SOIL_SERVICE_URL}/humus`, payload).then(response => response.json());
}
