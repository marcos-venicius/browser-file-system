import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { File } from 'lucide-react'
import { ItemInfo, Kind } from '~/hooks/use-file-system/types'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

type Props = {
  info: ItemInfo<Kind.File>
}

export function FileDisplay({ info }: Props) {
  return (
    <tr className='mb-1 block p-2 rounded'>
      <td className='w-10'>
        <File size={15} className='text-zinc-600' />{' '}
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
