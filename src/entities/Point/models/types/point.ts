export interface IPoint {
  type: "Feature",
  id: string,
  geometry: {
    type: string,
    coordinates: number[]
  } ,
  properties?:  {
    "name": string,
    "street": string,
    "entrance": string,
    "countNewspaper": string,
    // "balloonContent": `<div>Раздавал ${name.value},
    // кол-во ${countNewspaper.value}  газет.
    // Адрес: ${street.value} Подъезды: ${entrance.value}
    // </div>`,
  },
  options?: {
    preset: string
  }
}

export type TypeMode = "create" | "edit"



export interface Street {
  "value": "г Благовещенск, ул Трудовая, д 49",
  "unrestricted_value": "675004, Амурская обл, г Благовещенск, ул Трудовая, д 49",
  "data": {
    "postal_code": "675004",
    "country": "Россия",
    "country_iso_code": "RU",
    "federal_district": null,
    "region_fias_id": "844a80d6-5e31-4017-b422-4d9c01e9942c",
    "region_kladr_id": "2800000000000",
    "region_iso_code": "RU-AMU",
    "region_with_type": "Амурская обл",
    "region_type": "обл",
    "region_type_full": "область",
    "region": "Амурская",
    "area_fias_id": null,
    "area_kladr_id": null,
    "area_with_type": null,
    "area_type": null,
    "area_type_full": null,
    "area": null,
    "city_fias_id": "8f41253d-6e3b-48a9-842a-25ba894bd093",
    "city_kladr_id": "2800000100000",
    "city_with_type": "г Благовещенск",
    "city_type": "г",
    "city_type_full": "город",
    "city": "Благовещенск",
    "city_area": null,
    "city_district_fias_id": null,
    "city_district_kladr_id": null,
    "city_district_with_type": null,
    "city_district_type": null,
    "city_district_type_full": null,
    "city_district": null,
    "settlement_fias_id": null,
    "settlement_kladr_id": null,
    "settlement_with_type": null,
    "settlement_type": null,
    "settlement_type_full": null,
    "settlement": null,
    "street_fias_id": "aefc3030-3861-4248-81fb-5cab0389aa7f",
    "street_kladr_id": "28000001000014000",
    "street_with_type": "ул Трудовая",
    "street_type": "ул",
    "street_type_full": "улица",
    "street": "Трудовая",
    "stead_fias_id": null,
    "stead_cadnum": null,
    "stead_type": null,
    "stead_type_full": null,
    "stead": null,
    "house_fias_id": "afe4f0ef-3661-43ac-abdd-8191af5de91f",
    "house_kladr_id": "2800000100001400022",
    "house_cadnum": "28:01:130055:350",
    "house_type": "д",
    "house_type_full": "дом",
    "house": "49",
    "block_type": null,
    "block_type_full": null,
    "block": null,
    "entrance": null,
    "floor": null,
    "flat_fias_id": null,
    "flat_cadnum": null,
    "flat_type": null,
    "flat_type_full": null,
    "flat": null,
    "flat_area": null,
    "square_meter_price": null,
    "flat_price": null,
    "room_fias_id": null,
    "room_cadnum": null,
    "room_type": null,
    "room_type_full": null,
    "room": null,
    "postal_box": null,
    "fias_id": string,
    "fias_code": null,
    "fias_level": "8",
    "fias_actuality_state": "0",
    "kladr_id": "2800000100001400022",
    "geoname_id": "2026609",
    "capital_marker": "2",
    "okato": "10401000000",
    "oktmo": "10701000001",
    "tax_office": "2800",
    "tax_office_legal": "2800",
    "timezone": null,
    "geo_lat": "50.264183",
    "geo_lon": "127.54542",
    "beltway_hit": null,
    "beltway_distance": null,
    "metro": null,
    "divisions": null,
    "qc_geo": "0",
    "qc_complete": null,
    "qc_house": null,
    "history_values": null,
    "unparsed_parts": null,
    "source": null,
    "qc": null
  }
}
export  interface StreetData {
  "suggestions": Street[]
}

export interface IGetPoint {
  geo_lat: string
  geo_lon: string
  count: string
  createdAt: string
  date: string
  id: number
  updatedAt: string
  userId: number
}
