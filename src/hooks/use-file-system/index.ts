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

  return {
    pwd: path.pwd
  }
}

export type UseFileSystem = {
  pwd(): Array<PathLocation>
}
