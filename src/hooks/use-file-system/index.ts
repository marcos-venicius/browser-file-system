import { useEffect, useState } from 'react'
import { usePath } from './use-path'
import {
  Directory,
  FileSystem,
  ItemInfo,
  Kind,
  PathLocation,
  SystemOutput,
  formatKind
} from '../../types'
import { validFolderName } from '~/utils/valid-folder-name'
import { Data } from './data'
import { toast } from 'sonner'

function useFileSystemLoader(): [FileSystem, React.Dispatch<React.SetStateAction<FileSystem>>] {
  const [fileSystem, setFileSystem] = useState<FileSystem>(Directory.create('/', ['/']))

  useEffect(() => {
    Data.load().then(setFileSystem).finally(Data.emitLoaded)
  }, [])

  return [fileSystem, setFileSystem]
}

export function useFileSystem(): UseFileSystem {
  const [fileSystem, setFileSystem] = useFileSystemLoader()

  const path = usePath(['/'], fileSystem)

  function ls() {
    const node = path._getCurrentNode()

    if (!node) return []

    return node.children.map(item => item.o.info())
  }

  function mkdir(name: string): SystemOutput {
    const folderName = validFolderName(name)

    if (!folderName) {
      return {
        error: true,
        message: 'invalid folder name'
      }
    }

    let slow: FileSystem | null = null
    let fast = [fileSystem]

    for (const chunk of path.pwd()) {
      for (const item of fast) {
        if (item.o.name === chunk.name && item.kind === Kind.Dir) {
          fast = (item.o as Directory).children
          slow = item
          break
        }
      }
    }

    if (!slow) {
      return {
        error: true,
        message: 'current path not found'
      }
    }

    for (const child of (slow.o as Directory).children) {
      if (child.o.name === folderName) {
        return {
          error: true,
          message: `already exists a ${formatKind(child.kind)} with this name`
        }
      }
    }

    (slow.o as Directory).children.unshift(
      Directory.create(folderName, [...slow.o.location, folderName])
    )

    setFileSystem({ ...fileSystem })

    return {
      error: false,
      message: ''
    }
  }

  useEffect(() => {
    Data.save(fileSystem).catch(() => toast.error('could not save the state'))
  }, [fileSystem])

  return {
    pwd: path.pwd,
    cd: path.cd,
    ls,
    mkdir
  }
}

export type UseFileSystem = {
  pwd(): Array<PathLocation>
  cd(location: Array<string>): void
  ls(): Array<ItemInfo>
  mkdir(name: string): SystemOutput
}
