import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { File } from 'lucide-react'
import { ItemInfo, Kind } from '~/types'

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
      <td className='w-52 px-5 text-sm max-w-52 font-mono text-zinc-800 overflow-ellipsis overflow-hidden whitespace-nowrap'>
        {info.name}
      </td>
      <td className='w-52 px-5 text-sm font-mono text-zinc-800'>{dayjs().to(info.createdAt)}</td>
      <td className='w-52 px-5 text-sm font-mono text-zinc-800'>{dayjs().to(info.updatedAt)}</td>
    </tr>
  )
}
