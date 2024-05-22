export interface IGroup {
  id: string
  name: string
  about: IAbout
  band_members: IBandMember[]
  places: IPlace[]
  reviews: IReview[]
  contacts: IContact
  grammotes: IGrammote[]
}

export interface IGrammote {
  name: string
  photo: string
}

export interface IAbout {
  title: string
  description: string
}

export interface IAbout {
  title: string
  description: string
}

export interface IBandMember {
  photo: string
  fio: string
  role: string
}

export interface IPlace {
  name: string
  photo: IPhoto[]
}

export interface IPhoto {
  name: string
  photo: string
}



export interface IReview {
  avatar: string
  name: string
  comment: string
}

export interface IContact {
  phone: string
  fio: string
}
