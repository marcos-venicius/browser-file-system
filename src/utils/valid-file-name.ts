import { settings } from '~/settings'

export function validFileName(name: string) {
  name = name.trim()

  if (settings.VALID_FILE_NAME_REGEX.test(name)) return name

  return null
}
