import { useEffect, useState } from 'react'
import { usePath } from './use-path'
import {
  Directory,
  File,
  FileSystem,
  ItemInfo,
  Kind,
  PathLocation,
  SystemOutput,
  SystemOutputCode,
  formatKind
} from '../../types'
import { validFolderName } from '~/utils/valid-folder-name'
import { validFileName } from '~/utils/valid-file-name'
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

  function rmdir(location: Array<string>, force = false): SystemOutput {
    let slow: FileSystem | null = null
    let fast = [fileSystem]

    for (const chunk of location.slice(0, location.length - 1)) {
      for (const item of fast) {
        if (item.o.name === chunk && item.kind === Kind.Dir) {
          fast = (item.o as Directory).children
          slow = item
          break
        }
      }
    }

    if (!slow) return SystemOutput.error('parent path not found')

    const folderName = location[location.length - 1]

    const folder: Directory | null = (slow.o as Directory).children.find(
      x => x.o.name === folderName && x.kind === Kind.Dir
    )?.o as Directory

    if (!folder) return SystemOutput.error('directory not found')

    if (folder.children.length > 0 && !force) {
      return SystemOutput.error('directory not empty', SystemOutputCode.DirectoryNotEmpty)
    }

    const dir = slow.o as Directory

    dir.removeChildren(Kind.Dir, folderName)

    setFileSystem({ ...fileSystem })

    return SystemOutput.success()
  }

  function rmfile(location: Array<string>): SystemOutput {
    let slow: FileSystem | null = null
    let fast = [fileSystem]

    for (const chunk of location.slice(0, location.length - 1)) {
      for (const item of fast) {
        if (item.o.name === chunk && item.kind === Kind.Dir) {
          fast = (item.o as Directory).children
          slow = item
          break
        }
      }
    }

    if (!slow) return SystemOutput.error('parent path not found')

    const fileName = location[location.length - 1]

    const file: File | null = (slow.o as Directory).children.find(
      x => x.o.name === fileName && x.kind === Kind.File
    )?.o as File

    if (!file) return SystemOutput.error('file not found')

    const dir = slow.o as Directory

    dir.removeChildren(Kind.File, fileName)

    setFileSystem({ ...fileSystem })

    return SystemOutput.success()
  }

  function mkdir(name: string): SystemOutput {
    const folderName = validFolderName(name)

    if (!folderName) {
      return SystemOutput.error('invalid folder name')
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
      return SystemOutput.error('current path not found')
    }

    for (const child of (slow.o as Directory).children) {
      if (child.o.name === folderName) {
        return SystemOutput.error(`already exists a ${formatKind(child.kind)} with this name`)
      }
    }

    (slow.o as Directory).children.unshift(
      Directory.create(folderName, [...slow.o.location, folderName])
    )

    setFileSystem({ ...fileSystem })

    return SystemOutput.success()
  }

  function touch(name: string): SystemOutput {
    const fileName = validFileName(name)

    if (!fileName) {
      return SystemOutput.error('invalid file name')
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
      return SystemOutput.error('current path not found')
    }

    for (const child of (slow.o as Directory).children) {
      if (child.o.name === fileName) {
        return SystemOutput.error(`already exists a ${formatKind(child.kind)} with this name`)
      }
    }

    (slow.o as Directory).children.unshift(File.create(fileName, [...slow.o.location, fileName]))

    setFileSystem({ ...fileSystem })

    return SystemOutput.success()
  }

  useEffect(() => {
    Data.save(fileSystem).catch(() => toast.error('could not save the state'))
  }, [fileSystem])

  return {
    pwd: path.pwd,
    cd: path.cd,
    ls,
    rmdir,
    rmfile,
    mkdir,
    touch
  }
}

export type UseFileSystem = {
  pwd(): Array<PathLocation>
  cd(location: Array<string>): void
  ls(): Array<ItemInfo>
  rmdir(location: Array<string>, force?: boolean): SystemOutput
  rmfile(location: Array<string>): SystemOutput
  mkdir(name: string): SystemOutput
  touch(name: string): SystemOutput
}
