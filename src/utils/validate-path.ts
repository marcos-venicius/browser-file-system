import { Directory, FSLocation, FileSystem, Kind, PathLocation } from '~/types'

export function safePath(path: FSLocation, fs: FileSystem): [boolean, Array<PathLocation>] {
  const pathLocation: Array<PathLocation> = []

  function find(array = [fs], index = 0) {
    for (const item of array) {
      if (item.o.name === path[index]) {
        pathLocation.push({
          name: item.o.name,
          location: item.o.location
        })
      }

      if (index === path.length - 1) return true

      if (item.kind === Kind.Dir) return find((item.o as Directory).children, index + 1)
    }

    return false
  }

  const found = find()
  const result = found ? pathLocation : []

  return [found, result]
}
