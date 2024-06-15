import { FilePlus, FolderPlus } from 'lucide-react'
import { useFileSystem } from './hooks/use-file-system'
import { CurrentPath } from './components/current-path'
import { Ls } from './components/ls'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '~/components/ui/dropdown-menu'

export function App() {
  const fs = useFileSystem()

  return (
    <main className='w-full mx-auto max-w-6xl'>
      <header className='w-full p-5 flex items-center justify-between gap-5 border-b'>
        <CurrentPath fs={fs} />

        <div className='flex items-center gap-3'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <FolderPlus className='text-zinc-600' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                className='flex gap-3 items-center'
                onClick={fs.mkdir.bind(null, 'any')}>
                <FolderPlus size={15} className='text-zinc-600' /> new folder
              </DropdownMenuItem>

              <DropdownMenuItem className='flex gap-3 items-center'>
                <FilePlus size={15} className='text-zinc-600' /> new file
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Ls fs={fs} />
    </main>
  )
}
