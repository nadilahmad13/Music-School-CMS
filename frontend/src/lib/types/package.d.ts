export interface Package {
  id: number
  status: string
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null
  name: string
  start_datetime: string
  end_datetime: string
  student: string
  duration: number
  remarks: string | null
  instrument: number
  lessons_quota: number
  lessons: number[]
  payments: number[]
}
