import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { File, Trash } from 'lucide-react'
import { ItemInfo, Kind } from '~/types'
import { Button } from '../ui/button'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

type Props = {
  info: ItemInfo<Kind.File>
  onRequestDelete(location: Array<string>): void
}

export function FileDisplay({ info, onRequestDelete }: Props) {
  return (
    <tr className='group relative mb-1 block p-2 rounded'>
      <td className='w-10'>
        <File size={15} className='text-zinc-600' />{' '}
      </td>
      <td className='w-52 px-5 text-sm max-w-52 font-mono text-zinc-800 overflow-ellipsis overflow-hidden whitespace-nowrap'>
        {info.name}
      </td>
      <td className='w-52 px-5 text-sm font-mono text-zinc-800'>{dayjs().to(info.createdAt)}</td>
      <td className='w-52 px-5 text-sm font-mono text-zinc-800'>{dayjs().to(info.updatedAt)}</td>

      <td className='absolute h-full right-0 top-1/2 -translate-y-1/2 flex items-center justify-end gap-1 transition-opacity opacity-0 group-hover:opacity-100'>
        <Button
          variant='link'
          className='h-8 w-10 p-0 flex items-center justify-center'
          onClick={onRequestDelete.bind(null, info.location)}>
          <Trash size={16} className='text-red-500' />
        </Button>
      </td>
    </tr>
  )
}
