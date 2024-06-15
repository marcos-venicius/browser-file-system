import { useState } from "react";
import { usePath } from "./use-path";
import { Directory, File, FileSystem, PathLocation } from "./types";

export function useFileSystem(): UseFileSystem {
  const [fileSystem] = useState<FileSystem.FileSystem>(
    Directory.create('/', [
      Directory.create('home', [
        Directory.create('job', [
          Directory.create('projects', [
            File.create('app.tsx')
          ])
        ]),
        Directory.create('dev', [
          Directory.create('projects')
        ])
      ])
    ])
  )

  const path = usePath(['/', 'home', 'job', 'projects'], fileSystem)

  function ls() {
  }

  return {
    pwd: path.pwd,
    cd: path.cd
  }
}

export type UseFileSystem = {
  pwd(): Array<PathLocation>
  cd(location: Array<string>): void
}
