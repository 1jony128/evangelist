export interface IAddPoint {
  address?: string
  user_name: string
  group_name: string
  "geo_lat"?: string,
  "geo_lon"?: string,
  "date": string,
  "count": number,
  "userId": number,
  "groupId": number
  comment: string
}

export interface IUpdatePoint {
  id: number,
  data: IAddPoint
}
