import { FolderPlus } from 'lucide-react'
import { Button } from './components/ui/button'
import { useFileSystem } from './hooks/use-file-system'
import { CurrentPath } from './components/current-path'
import { ItemInfo, Kind } from './hooks/use-file-system/types'
import { FolderDisplay } from './components/folder-display'
import { FileDisplay } from './components/file-display'

export function App() {
  const fs = useFileSystem()

  const items = fs.ls()

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
      <table className='block p-5'>
        <thead>
          <tr className='px-2 block'>
            <th className='w-10'></th>
            <th className='text-sm text-zinc-600 w-40 px-5' align='left'>
              Name
            </th>
            <th className='text-sm text-zinc-600 w-52 px-5' align='left'>
              Created at
            </th>
            <th className='text-sm text-zinc-600 w-52 px-5' align='left'>
              Updated at
            </th>
          </tr>
        </thead>
        <tbody className='block mt-5'>
          {items.map(item => {
            if (item.kind === Kind.Dir) {
              return (
                <FolderDisplay key={item.name} info={item as ItemInfo<Kind.Dir>} onClick={fs.cd} />
              )
            }

            if (item.kind === Kind.File) {
              return <FileDisplay key={item.name} info={item as ItemInfo<Kind.File>} />
            }
          })}
        </tbody>
      </table>
    </main>
  )
}
