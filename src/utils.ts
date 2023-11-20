import { nanoid } from 'nanoid'

export function getUniqueKey(): string {
  return nanoid()
}
