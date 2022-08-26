

export interface IPoint {
    type: "Feature",
    id: string, 
    geometry: {
        type: string, 
        coordinates: [number, number]
    } ,
    properties:  {
        "name": string,
        "street": string,
        "entrance": string,
        "countNewspaper": string,
        // "balloonContent": `<div>Раздавал ${name.value},
        // кол-во ${countNewspaper.value}  газет.
        // Адрес: ${street.value} Подъезды: ${entrance.value}
        // </div>`,
    },
    options: {
        preset: string
    }
}

export type TypeMode = "create" | "edit"