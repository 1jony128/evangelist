export type User = {
  id: number;
  name: string;
};


export type IGroup = {
  id: number;
  name: string;
  users: User[];
};


export interface signGroupDto {
  userId: number
  access_key: string
}
