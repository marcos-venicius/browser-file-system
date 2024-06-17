import { CustomContextMenu } from '~/components/custom-context-menu'
import { ChevronLeft, FilePlus, FolderPlus } from 'lucide-react'
import { useFileSystem } from './hooks/use-file-system'
import { CurrentPath } from './components/current-path'
import { Ls } from './components/ls'
import { useRef } from 'react'
import { CreateFolderDialog } from './components/create-folder-dialog'
import { Button } from './components/ui/button'
import { CreateFileDialog } from './components/create-file-dialog'
import { Cat } from './components/cat'

export function App() {
  const fs = useFileSystem()

  const createFolderDialog = useRef<CreateFolderDialog>(null)
  const createFileDialog = useRef<CreateFileDialog>(null)

  function openCreateFolderDialog() {
    if (createFolderDialog.current) {
      createFolderDialog.current.open()
    }
  }

  function openCreateFileDialog() {
    if (createFileDialog.current) {
      createFileDialog.current.open()
    }
  }

  return (
    <>
      <CreateFolderDialog ref={createFolderDialog} fs={fs} />
      <CreateFileDialog ref={createFileDialog} fs={fs} />

      <main className='w-full mx-auto max-w-6xl'>
        <header className='w-full py-5 flex items-center justify-between gap-5 border-b h-20'>
          <CurrentPath fs={fs} />

          <div className='flex items-center gap-3'>
            <Button
              size='sm'
              className='p-2'
              variant='ghost'
              onClick={openCreateFileDialog}
              disabled={fs.openedFile !== null}>
              <FilePlus className='text-zinc-600' size={22} />
            </Button>

            <Button
              size='sm'
              className='p-2'
              variant='ghost'
              onClick={openCreateFolderDialog}
              disabled={fs.openedFile !== null}>
              <FolderPlus className='text-zinc-600' size={22} />
            </Button>
          </div>
        </header>

        {fs.openedFile ? (
          <Cat fs={fs} />
        ) : (
          <CustomContextMenu
            render={[
              <CustomContextMenu.Option
                onClick={fs.goBack}
                disabled={fs.pwd().length === 1}
                icon={<ChevronLeft className='text-zinc-600' size={16} />}>
                go back
              </CustomContextMenu.Option>,
              <CustomContextMenu.Option
                icon={<FilePlus className='text-zinc-600' size={16} />}
                onClick={openCreateFileDialog}>
                new file
              </CustomContextMenu.Option>,
              <CustomContextMenu.Option
                icon={<FolderPlus className='text-zinc-600' size={16} />}
                onClick={openCreateFolderDialog}>
                new folder
              </CustomContextMenu.Option>
            ]}>
            <Ls fs={fs} />
          </CustomContextMenu>
        )}
      </main>
    </>
  )
}
