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

export function formatKind(kind: Kind) {
  switch (kind) {
    case Kind.Dir:
      return 'directory'
    case Kind.File:
      return 'file'
    default:
      return 'unkown'
  }
}

export type SystemOutput = {
  error: boolean
  message: string
}

export type FileSystem<T extends Kind = Kind.Dir | Kind.File> = { kind: T } & (T extends Kind.File
  ? FileKind
  : DirKind)

export type PathLocation = {
  location: Array<string>
  name: string
}

export type ItemInfo<T extends Kind = Kind.File | Kind.Dir> = {
  name: string
  createdAt: Date
  updatedAt: Date
  location: Array<string>
  kind: T
}

abstract class Item<T extends Kind> {
  public readonly name: string
  public readonly updatedAt: Date
  public readonly createdAt: Date
  public readonly location: Array<string>
  private readonly kind: T

  constructor(name: string, kind: T, location: Array<string>) {
    const date = new Date()

    this.name = name
    this.kind = kind
    this.location = location
    this.createdAt = date
    this.updatedAt = date
  }

  public info(): ItemInfo<T> {
    return {
      name: this.name,
      createdAt: this.createdAt,
      location: this.location,
      updatedAt: this.updatedAt,
      kind: this.kind
    }
  }
}

export class File extends Item<Kind.File> {
  public readonly content: string

  constructor(name: string, location: Array<string>, content = '') {
    super(name, Kind.File, location)

    this.content = content
  }

  public static create(name: string, location: Array<string>, content = ''): FileSystem<Kind.File> {
    return {
      o: new File(name, location, content),
      kind: Kind.File
    }
  }
}

export class Directory extends Item<Kind.Dir> {
  public readonly children: Array<FileSystem>

  constructor(name: string, location: Array<string>, children: Array<FileSystem> = []) {
    super(name, Kind.Dir, location)

    this.children = children
  }

  public static create(
    name: string,
    location: Array<string>,
    children: Array<FileSystem> = []
  ): FileSystem<Kind.Dir> {
    return {
      kind: Kind.Dir,
      o: new Directory(name, location, children)
    }
  }
}
