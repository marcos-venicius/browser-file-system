import { FolderPlus } from 'lucide-react'
import { Button } from './components/ui/button'
import { useFileSystem } from './hooks/use-file-system'
import { CurrentPath } from './components/current-path'
import { Ls } from './components/ls'

export function App() {
  const fs = useFileSystem()

  return (
    <main className='w-full mx-auto max-w-6xl'>
      <header className='w-full p-5 flex items-center justify-between gap-5 border-b'>
        <CurrentPath fs={fs} />

        <div className='flex items-center gap-3'>
          <Button variant='ghost'>
            <FolderPlus className='text-zinc-600' />
          </Button>
        </div>
      </header>

      <Ls fs={fs} />
    </main>
  )
}
