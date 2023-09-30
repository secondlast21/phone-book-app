export interface ContactDetailType {
  contact_by_pk: ContactByPk
}

export interface ContactByPk {
  last_name: string
  id: number
  first_name: string
  created_at: Date
  phones: Phone[]
}

export interface Phone {
  number: string
}
