import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { UseFileSystem } from '~/hooks/use-file-system'
import { joinElements } from '~/hooks/use-file-system/join-elements'
import React from 'react'
import { toast } from 'sonner'

type Props = {
  fs: UseFileSystem
}

export function CurrentPath({ fs }: Props) {
  const pwd = fs.pwd()

  function changePath(location: Array<string>) {
    fs.cd(location)
  }

  function closeCurrentFile() {
    const result = fs.close()

    if (result.error) toast.error(result.message)
  }

  function fullPath() {
    const currentPath = pwd.map(path => (
      <Button
        variant='ghost'
        size='sm'
        className='text-zinc-600 font-mono text-sm px-1 min-w-5'
        onClick={changePath.bind(null, path.location)}>
        {path.name}
      </Button>
    ))

    if (fs.openedFile) {
      currentPath.push(
        <Button
          variant='ghost'
          size='sm'
          className='text-zinc-600 font-mono text-sm px-1 min-w-5'
          disabled>
          {fs.openedFile[fs.openedFile.length - 1]}
        </Button>
      )
    }

    return currentPath
  }

  const fullPathAsElements = joinElements(
    fullPath(),
    <ChevronRight className='text-zinc-400' size={15} />
  )

  const Path = () => React.Children.toArray(fullPathAsElements)

  return (
    <div className='flex items-center flex-wrap'>
      {fs.openedFile ? (
        <Button variant='ghost' size='icon' title='close file' onClick={closeCurrentFile}>
          <X size={16} className='text-zinc-700' />
        </Button>
      ) : (
        <Button
          variant='ghost'
          size='icon'
          title='close file'
          onClick={fs.goBack}
          disabled={pwd.length === 1}>
          <ChevronLeft size={16} className='text-zinc-700' />
        </Button>
      )}

      <span className='mx-2 h-[20px] w-[2px] bg-zinc-100 rounded-full' />

      <Path />
    </div>
  )
}
