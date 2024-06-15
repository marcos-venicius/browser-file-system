export namespace FileSystem {
  type FileKind = {
    o: File
  }

  type DirKind = {
    o: Directory
  }

  export type Settings = {}

  export enum Kind {
    Dir = 'dir',
    File = 'file'
  }

  export type FileSystem<T extends Kind = Kind.Dir | Kind.File> = { kind: T } & (T extends Kind.File ? FileKind : DirKind)
}

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
    const date = new Date();

    this.name = name;
    this.content = content;
    this.updatedAt = date;
    this.createdAt = date;
  }

  public static create(name: string, content = ''): FileSystem.FileSystem<FileSystem.Kind.File> {
    return {
      o: new File(name, content),
      kind: FileSystem.Kind.File
    }
  }
}

export class Directory {
  public readonly name: string
  public readonly children: Array<FileSystem.FileSystem>
  public readonly updatedAt: Date
  public readonly createdAt: Date

  constructor(name: string, children: Array<FileSystem.FileSystem> = []) {
    const date = new Date();

    this.name = name;
    this.children = children;
    this.updatedAt = date;
    this.createdAt = date;
  }

  public static create(name: string, children: Array<FileSystem.FileSystem> = []): FileSystem.FileSystem<FileSystem.Kind.Dir> {
    return {
      kind: FileSystem.Kind.Dir,
      o: new Directory(name, children)
    }
  }
}
