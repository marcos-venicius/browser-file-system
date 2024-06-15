type FileKind = {
  o: File
}

type DirKind = {
  o: Directory
}

export enum Kind {
  Dir = 'dir',
  File = 'file'
}

export type FileSystem<T extends Kind = Kind.Dir | Kind.File> = { kind: T } & (T extends Kind.File
  ? FileKind
  : DirKind)

export type PathLocation = {
  location: Array<string>
  name: string
}

export class File {
  public readonly name: string
  public readonly content: string
  public readonly updatedAt: Date
  public readonly createdAt: Date

  constructor(name: string, content: string) {
    const date = new Date()

    this.name = name
    this.content = content
    this.updatedAt = date
    this.createdAt = date
  }

  public static create(name: string, content = ''): FileSystem<Kind.File> {
    return {
      o: new File(name, content),
      kind: Kind.File
    }
  }
}

export class Directory {
  public readonly name: string
  public readonly children: Array<FileSystem>
  public readonly updatedAt: Date
  public readonly createdAt: Date

  constructor(name: string, children: Array<FileSystem> = []) {
    const date = new Date()

    this.name = name
    this.children = children
    this.updatedAt = date
    this.createdAt = date
  }

  public static create(name: string, children: Array<FileSystem> = []): FileSystem<Kind.Dir> {
    return {
      kind: Kind.Dir,
      o: new Directory(name, children)
    }
  }
}
