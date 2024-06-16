import { useState } from 'react'
import { Directory, FileSystem, Kind } from '~/types'
import { validatePath } from '~/utils/validate-path'

export function usePath(initialPath: Array<string> = [], fs: FileSystem) {
  const [path, setPath] = useState(validatePath(initialPath, fs))

  function pwd() {
    return path
  }

  function cd(location: Array<string>) {
    setPath(validatePath(location, fs))
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
    _getCurrentNode
  }
}
