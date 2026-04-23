import { Directory, FSLocation, FileSystem, Kind, PathLocation } from '~/types'

type SafePathReturn = [true, Array<PathLocation>, Kind] | [false, Array<PathLocation>, null]

export function safePath(path: FSLocation, fs: FileSystem): SafePathReturn {
  const pathLocation: Array<PathLocation> = []

  let current = [fs]
  let kind: Kind | null = null;

  for (const pathName of path) {
    for (const item of current) {
      if (item.o.name === pathName) {
        pathLocation.push({
          name: item.o.name,
          location: item.o.location
        })

        kind = item.kind

        if (item.kind === Kind.Dir) current = (item.o as Directory).children

        break
      }
    }
  }

  const found = pathLocation.length === path.length
  const result = found ? pathLocation : []

  return [found, result, kind] as SafePathReturn
}
