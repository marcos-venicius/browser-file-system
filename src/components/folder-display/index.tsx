import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Folder } from 'lucide-react'
import { ItemInfo, Kind } from '~/types'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

type Props = {
  info: ItemInfo<Kind.Dir>
  onClick(location: Array<string>): void
}

export function FolderDisplay({ info, onClick }: Props) {
  return (
    <tr
      className='mb-1 block hover:bg-zinc-100 p-2 rounded transition-colors cursor-pointer'
      onClick={onClick.bind(null, info.location)}>
      <td className='w-10'>
        <Folder size={15} className='text-zinc-600' />{' '}
      </td>
      <td className='w-40 px-5'>
        <p className='text-sm font-mono text-zinc-800'>{info.name}</p>
      </td>
      <td className='w-52 px-5'>
        <p className='text-sm font-mono text-zinc-800'>{dayjs().to(info.createdAt)}</p>
      </td>
      <td className='w-52 px-5'>
        <p className='text-sm font-mono text-zinc-800'>{dayjs().to(info.updatedAt)}</p>
      </td>
    </tr>
  )
}
