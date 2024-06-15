import { useState } from "react";
import { Directory, FileSystem, PathLocation } from "./types";

function validatePath(path: Array<string>, fs: FileSystem.FileSystem, alternativePath: Array<string> = []) {
  function check(array = [fs], index = 0) {
    if (index === path.length) return true;

    for (const item of array) {
      if (item.kind === FileSystem.Kind.Dir && item.o.name === path[index]) {
        return check((item.o as Directory).children, index + 1)
      }
    }

    return false;
  }

  const pathIsValid = check();
  const pathToReturn = pathIsValid ? path : alternativePath
  const pathDescription: Array<PathLocation> = []

  for (let i = 0; i < pathToReturn.length; i++) {
    if (i === 0) {
      pathDescription.push({
        name: pathToReturn[i],
        location: [pathToReturn[i]]
      })
    } else {
      pathDescription.push({
        name: pathToReturn[i],
        location: [...pathDescription[i - 1].location, pathToReturn[i]]
      })
    }
  }

  return pathDescription
}

export function usePath(initialPath: Array<string> = [], fs: FileSystem.FileSystem) {
  const [path, setPath] = useState(validatePath(initialPath, fs, []))

  function pwd() {
    return path;
  }

  function cd(location: Array<string>) {
    setPath(currentPath => validatePath(location, fs, currentPath.map(x => x.name)))
  }

  return {
    pwd,
    cd
  }
}
