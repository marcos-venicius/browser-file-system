import { ChevronRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { UseFileSystem } from '~/hooks/use-file-system'
import { joinElements } from '~/hooks/use-file-system/join-elements'
import React from 'react'

type Props = {
  fs: UseFileSystem
}

export function CurrentPath({ fs }: Props) {
  const pwd = fs.pwd()

  function changePath(location: Array<string>) {
    fs.cd(location)
  }

  const fullPath = pwd.map(path => (
    <Button
      variant='ghost'
      size='sm'
      className='text-zinc-600 font-mono text-sm px-1 min-w-5'
      onClick={changePath.bind(null, path.location)}>
      {path.name}
    </Button>
  ))

  const fullPathAsElements = joinElements(
    fullPath,
    <ChevronRight className='text-zinc-400' size={15} />
  )

  const Path = () => React.Children.toArray(fullPathAsElements)

  return (
    <div className='flex items-center'>
      <Path />
    </div>
  )
}
