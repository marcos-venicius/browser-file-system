import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { File, Pencil, Trash } from 'lucide-react'
import { ItemInfo, Kind } from '~/types'
import { CustomContextMenu } from '../custom-context-menu'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

type Props = {
  info: ItemInfo<Kind.File>
  onClick(location: Array<string>): void
  onRequestDelete(location: Array<string>): void
  onRequestEditName(location: Array<string>): void
}

export function FileDisplay({ info, onClick, onRequestDelete }: Props) {
  return (
    <CustomContextMenu
      render={[
        <CustomContextMenu.Option
          icon={<Trash size={16} className='text-red-500' />}
          onClick={onRequestDelete.bind(null, info.location)}>
          delete
        </CustomContextMenu.Option>,
        <CustomContextMenu.Option
          icon={<Pencil size={16} className='text-yellow-500' />}>
          edit
        </CustomContextMenu.Option>
      ]}>
      <tr
        className='mb-1 block p-2 rounded transition-colors cursor-pointer hover:bg-zinc-100'
        onClick={onClick.bind(null, info.location)}>
        <td className='w-10'>
          <File size={15} className='text-zinc-600' />{' '}
        </td>
        <td className='w-52 px-5 text-sm max-w-52 font-mono text-zinc-800 overflow-ellipsis overflow-hidden whitespace-nowrap'>
          {info.name}
        </td>
        <td className='w-52 px-5 text-sm font-mono text-zinc-800'>{dayjs().to(info.createdAt)}</td>
        <td className='w-52 px-5 text-sm font-mono text-zinc-800'>{dayjs().to(info.updatedAt)}</td>
      </tr>
    </CustomContextMenu>
  )
}
