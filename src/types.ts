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

export enum SystemOutputCode {
  DirectoryNotEmpty = 'directory-not-empty',
  Generic = 'generic',
  Success = 'success'
}

export class SystemOutput {
  public readonly error: boolean = false
  public readonly message: string = ''
  public readonly code: SystemOutputCode = SystemOutputCode.Generic

  constructor(error: boolean, message: string, code?: SystemOutputCode) {
    this.error = error
    this.message = message

    if (code) this.code = code
  }

  public static error(message: string, code?: SystemOutputCode) {
    return new SystemOutput(true, message, code)
  }

  public static success() {
    return new SystemOutput(false, '', SystemOutputCode.Success)
  }
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

type AdditionalOptions = {
  createdAt: Date
  updatedAt: Date
}

abstract class Item<T extends Kind> {
  public readonly name: string
  public readonly updatedAt: Date
  public readonly createdAt: Date
  public readonly location: Array<string>
  private readonly kind: T

  constructor(
    name: string,
    kind: T,
    location: Array<string>,
    additionalOptions?: AdditionalOptions
  ) {
    this.name = name
    this.kind = kind
    this.location = location

    if (additionalOptions) {
      this.createdAt = additionalOptions.createdAt
      this.updatedAt = additionalOptions.updatedAt
    } else {
      const date = new Date()

      this.createdAt = date
      this.updatedAt = date
    }
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

  constructor(
    name: string,
    location: Array<string>,
    content = '',
    additionalOptions?: AdditionalOptions
  ) {
    super(name, Kind.File, location, additionalOptions)

    this.content = content
  }

  public static create(
    name: string,
    location: Array<string>,
    content = '',
    additionalOptions?: AdditionalOptions
  ): FileSystem<Kind.File> {
    return {
      o: new File(name, location, content, additionalOptions),
      kind: Kind.File
    }
  }
}

export class Directory extends Item<Kind.Dir> {
  public children: Array<FileSystem> = []

  constructor(
    name: string,
    location: Array<string>,
    children: Array<FileSystem> = [],
    additionalOptions?: AdditionalOptions
  ) {
    super(name, Kind.Dir, location, additionalOptions)

    this.children = children
  }

  public removeChildren(kind: Kind, name: string) {
    this.children = this.children.filter(x => x.kind !== kind || x.o.name !== name)
  }

  public static create(
    name: string,
    location: Array<string>,
    children: Array<FileSystem> = [],
    additionalOptions?: AdditionalOptions
  ): FileSystem<Kind.Dir> {
    return {
      kind: Kind.Dir,
      o: new Directory(name, location, children, additionalOptions)
    }
  }
}
