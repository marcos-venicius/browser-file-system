import { Directory, File, FileSystem } from '~/types'

type FileSystemJson = {
  kind: 'dir' | 'file'
  o: {
    name: string
    updatedAt: string
    createdAt: string
    location: Array<string>
    kind: 'dir' | 'file'
    children: Array<FileSystemJson>
    content?: string
  }
}

export class Data {
  private static loaded = false

  public static emitLoaded() {
    Data.loaded = true
  }

  public static async save(fs: FileSystem) {
    if (!Data.loaded) return

    return new Promise<boolean>(resolve => {
      try {
        const stringData = JSON.stringify(fs)

        localStorage.setItem('fs', stringData)

        resolve(true)
      } catch {
        resolve(false)
      }
    })
  }

  public static load() {
    return new Promise<FileSystem>(resolve => {
      const fs = localStorage.getItem('fs')

      if (!fs) return resolve(Directory.create('/', ['/']))

      const json: FileSystemJson = JSON.parse(fs)

      function mount(x: FileSystemJson): FileSystem {
        const additionalOptions = {
          createdAt: new Date(x.o.createdAt),
          updatedAt: new Date(x.o.updatedAt)
        }

        if (x.kind === 'dir') {
          return Directory.create(
            x.o.name,
            x.o.location,
            x.o.children.map(x => mount(x)),
            additionalOptions
          )
        }

        return File.create(x.o.name, x.o.location, x.o.content, additionalOptions)
      }

      resolve(mount(json))
    })
  }
}
