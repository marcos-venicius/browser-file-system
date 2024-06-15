import { settings } from '~/settings'

export function validFolderName(name: string) {
  name = name.trim()

  if (settings.VALID_FOLDER_NAME_REGEX.test(name)) return name

  return null
}
