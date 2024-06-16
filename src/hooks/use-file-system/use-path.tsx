import { useState } from 'react'
import { Directory, FileSystem, Kind } from '~/types'
import { safePath } from '~/utils/validate-path'

export function usePath(initialPath: Array<string> = [], fs: FileSystem) {
  const [path, setPath] = useState(safePath(initialPath, fs)[1])

  function pwd() {
    return path
  }

  function cd(location: Array<string>) {
    const [found, pathLocation] = safePath(location, fs)

    setPath(pathLocation)

    return found
  }

  function goBack() {
    setPath(currentPath => {
      if (currentPath.length > 1) {
        return currentPath.slice(0, currentPath.length - 1)
      }

      return currentPath
    })
  }

  function _getCurrentNode() {
    function find(array = [fs], index = 0) {
      if (index > path.length - 1) return null

      for (const item of array) {
        if (item.kind === Kind.Dir && item.o.name === path[index].name) {
          if (index === path.length - 1) return item.o as Directory

          return find((item.o as Directory).children, index + 1)
        }
      }

      return null
    }

    return find()
  }

  return {
    pwd,
    cd,
    goBack,
    _getCurrentNode
  }
}
