import { IsString } from "class-validator";

export class UpdateEvaEventDto {
  readonly geo_lon: string;
  readonly geo_lat: string;
  readonly date: string;
  readonly count: number;
  readonly userId: number
  readonly groupId: number
  @IsString({message: 'Должно быть строкой'})
  readonly address: string
  @IsString({message: 'Должно быть строкой'})
  readonly user_name: string
  @IsString({message: 'Должно быть строкой'})
  readonly group_name: string
  @IsString({message: 'Должно быть строкой'})
  readonly comment: string
}
