export interface Lesson {
  id: number
  sort: number | null
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null
  package: number
  teacher: {
    id: number
    first_name: string
    last_name: string
  }
  start_datetime: string
  remarks: string | null
  status: string
}
