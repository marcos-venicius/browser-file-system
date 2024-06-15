import { FolderPlus } from 'lucide-react'
import { useFileSystem } from './hooks/use-file-system'
import { CurrentPath } from './components/current-path'
import { Ls } from './components/ls'
import { useRef } from 'react'
import { CreateFolderDialog } from './components/create-folder-dialog'
import { Button } from './components/ui/button'

export function App() {
  const fs = useFileSystem()

  const createFolderDialog = useRef<CreateFolderDialog>(null)

  function openCreateFolderDialog() {
    if (createFolderDialog.current) {
      createFolderDialog.current.open()
    }
  }

  return (
    <>
      <CreateFolderDialog ref={createFolderDialog} fs={fs} />

      <main className='w-full mx-auto max-w-6xl'>
        <header className='w-full p-5 flex items-center justify-between gap-5 border-b'>
          <CurrentPath fs={fs} />

          <div className='flex items-center gap-3'>
            <Button size='sm' className='p-2' variant='ghost' onClick={openCreateFolderDialog}>
              <FolderPlus className='text-zinc-600' size={22} />
            </Button>
          </div>
        </header>

        <Ls fs={fs} />
      </main>
    </>
  )
}
