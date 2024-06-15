import { ItemInfo, Kind } from '~/types'
import { FolderDisplay } from '~/components/folder-display'
import { FileDisplay } from '~/components/file-display'
import { UseFileSystem } from '~/hooks/use-file-system'

type Props = {
  fs: UseFileSystem
}

export function Ls({ fs }: Props) {
  const items = fs.ls()

  if (items.length === 0) return <p className='p-5 font-mono text-sm text-zinc-600'>empty</p>

  return (
    <table className='block p-5'>
      <thead>
        <tr className='px-2 block'>
          <th className='w-10'></th>
          <th className='text-sm text-zinc-600 w-40 px-5' align='left'>
            name
          </th>
          <th className='text-sm text-zinc-600 w-52 px-5' align='left'>
            created at
          </th>
          <th className='text-sm text-zinc-600 w-52 px-5' align='left'>
            updated at
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
  )
}
