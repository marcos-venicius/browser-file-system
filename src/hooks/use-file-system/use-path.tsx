import { useState } from "react";
import { Directory, FileSystem, PathLocation } from "./types";

function validatePath(path: Array<string>, fs: FileSystem.FileSystem) {
  function check(array = [fs], index = 0) {
    if (index === path.length) return true;

    for (const item of array) {
      if (item.kind === FileSystem.Kind.Dir && item.o.name === path[index]) {
        return check((item.o as Directory).children, index + 1)
      }
    }

    return false;
  }

  if (check()) {
    const pathDescription: Array<PathLocation> = []

    for (let i = 0; i < path.length; i++) {
      if (i === 0) {
        pathDescription.push({
          name: path[i],
          location: [path[i]]
        })
      } else {
        pathDescription.push({
          name: path[i],
          location: [...pathDescription[i - 1].location, path[i]]
        })
      }
    }

    return pathDescription
  }

  throw new Error('Invalid Path')
}

export function usePath(initialPath: Array<string> = [], fs: FileSystem.FileSystem) {
  const [path] = useState(validatePath(initialPath, fs))

  function pwd() {
    return path;
  }

  return {
    pwd,
  }
}
