import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Folder, Trash } from 'lucide-react'
import { ItemInfo, Kind } from '~/types'
import { CustomContextMenu } from '../custom-context-menu'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

type Props = {
  info: ItemInfo<Kind.Dir>
  onClick(location: Array<string>): void
  onRequestDelete(location: Array<string>): void
}

export function FolderDisplay({ info, onClick, onRequestDelete }: Props) {
  function handleOnClick() {
    onClick(info.location)
  }

  return (
    <CustomContextMenu
      render={[
        <CustomContextMenu.Option
          icon={<Trash size={16} className='text-red-500' />}
          onClick={onRequestDelete.bind(null, info.location)}>
            delete
        </CustomContextMenu.Option>
      ]}>
      <tr
        className='mb-1 block p-2 rounded transition-colors cursor-pointer hover:bg-zinc-100'
        onClick={handleOnClick}>
        <td className='w-10'>
          <Folder size={15} className='text-zinc-600' />
        </td>
        <td
          className='w-52 px-5 text-sm max-w-52 font-mono text-zinc-800 overflow-ellipsis overflow-hidden whitespace-nowrap'
          title={info.name}>
          {info.name}
        </td>
        <td className='w-52 px-5 text-sm font-mono text-zinc-800'>{dayjs().to(info.createdAt)}</td>
        <td className='w-52 px-5 text-sm font-mono text-zinc-800'>{dayjs().to(info.updatedAt)}</td>
      </tr>
    </CustomContextMenu>
  )
}
