export interface ContactListType {
  contact: Contact[]
}

export interface Contact {
  created_at: Date
  first_name: string
  id: number
  last_name: string
  phones: Phone[]
}

export interface ContactSet {
  created_at: Date
  first_name: string
  id: number
  last_name: string
  phones: Phone[]
  isFavorite: boolean
}

export interface Phone {
  number: string
}
