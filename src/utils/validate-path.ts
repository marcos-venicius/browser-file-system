import { Directory, FSLocation, FileSystem, Kind, PathLocation } from '~/types'

export function safePath(path: FSLocation, fs: FileSystem): [boolean, Array<PathLocation>] {
  const pathLocation: Array<PathLocation> = []

  let current = [fs]

  for (const pathName of path) {
    for (const item of current) {
      if (item.o.name === pathName) {
        pathLocation.push({
          name: item.o.name,
          location: item.o.location
        })
      }

      if (item.kind === Kind.Dir) current = (item.o as Directory).children
    }
  }

  const found = pathLocation.length === path.length
  const result = found ? pathLocation : []

  return [found, result]
}
