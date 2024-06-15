import { useState } from 'react'
import { usePath } from './use-path'
import { Directory, File, FileSystem, ItemInfo, PathLocation } from './types'

export function useFileSystem(): UseFileSystem {
  const [fileSystem] = useState<FileSystem>(
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

  return {
    pwd: path.pwd,
    cd: path.cd,
    ls
  }
}

export type UseFileSystem = {
  pwd(): Array<PathLocation>
  cd(location: Array<string>): void
  ls(): Array<ItemInfo>
}
