import { useState } from 'react'
import { usePath } from './use-path'
import {
  Directory,
  File,
  FileSystem,
  ItemInfo,
  Kind,
  PathLocation,
  SystemOutput,
  formatKind
} from '../../types'
import { validFolderName } from '~/utils/valid-folder-name'

export function useFileSystem(): UseFileSystem {
  const [fileSystem, setFileSystem] = useState<FileSystem>(
    Directory.create(
      '/',
      ['/'],
      [
        Directory.create(
          'home',
          ['/', 'home'],
          [
            Directory.create(
              'dev',
              ['/', 'home', 'dev'],
              [
                File.create('app.tsx', ['/', 'home', 'dev', 'app.tsx']),
                File.create('app.css', ['/', 'home', 'dev', 'app.css'])
              ]
            ),
            Directory.create('job', ['/', 'home', 'job'])
          ]
        )
      ]
    )
  )

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
