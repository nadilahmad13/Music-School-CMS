import { Student, Teacher } from "./users"

export interface Instrument {
  id: number
  name: string
  students: Student[]
  teachers: Teacher[]
}
