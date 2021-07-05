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
CROP_MISSING_SEASON_FAILS = [
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

PAYLOAD_CROP_MISSING_SEASON_FAIL = {
  "id": FIELD_ID_OK,
  "name": "Mäeotsa",
  "area": 0.93,
  "crops": CROP_MISSING_SEASON_FAILS
}