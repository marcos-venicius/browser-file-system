export function joinElements(list: Array<React.ReactNode>, using: React.ReactNode): Array<React.ReactNode> {
  const joined: Array<React.ReactNode> = []

  for (let i = 0; i < list.length; i++) {
    joined.push(list[i])

    if (i < list.length - 1) {
      joined.push(using);
    }
  }

  return joined
}
