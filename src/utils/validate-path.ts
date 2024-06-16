import { Directory, FileSystem, Kind, PathLocation } from '~/types'

export function validatePath(path: Array<string>, fs: FileSystem) {
  const pathLocation: Array<PathLocation> = []

  function find(array = [fs], index = 0) {
    for (const item of array) {
      if (item.kind === Kind.Dir && item.o.name === path[index]) {
        pathLocation.push({
          name: item.o.name,
          location: item.o.location
        })

        if (index === path.length - 1) return true

        return find((item.o as Directory).children, index + 1)
      }
    }

    return false
  }

  const found = find()

  if (found) return pathLocation

  return []
}
