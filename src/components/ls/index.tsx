import { ItemInfo, Kind, SystemOutputCode } from '~/types'
import { FolderDisplay } from '~/components/folder-display'
import { FileDisplay } from '~/components/file-display'
import { UseFileSystem } from '~/hooks/use-file-system'
import { toast } from 'sonner'
import { AskDeleteFolderDialog } from '../ask-delete-folder-dialog'
import { useRef } from 'react'
import { AskDeleteFileDialog } from '../ask-delete-file-dialog'

type Props = {
  fs: UseFileSystem
}

export function Ls({ fs }: Props) {
  const items = fs.ls()

  const askDeleteFolderDialog = useRef<AskDeleteFolderDialog>(null)
  const askDeleteFileDialog = useRef<AskDeleteFileDialog>(null)

  function openAskDeleteFolderDialog(location: Array<string>) {
    if (askDeleteFolderDialog.current) {
      askDeleteFolderDialog.current.open(location)
    }
  }

  function openAskDeleteFileDialog(location: Array<string>) {
    if (askDeleteFileDialog.current) {
      askDeleteFileDialog.current.open(location)
    }
  }

  function requestDeleteFolder(location: Array<string>, force = false) {
    const result = fs.rmdir(location, force)

    if (result.error && result.code !== SystemOutputCode.DirectoryNotEmpty) {
      toast.error(result.message)
    }

    if (result.code === SystemOutputCode.DirectoryNotEmpty) {
      openAskDeleteFolderDialog(location)
    }
  }

  function requestDeleteFile(location: Array<string>) {
    const result = fs.rmfile(location)

    if (result.error) {
      toast.error(result.message)
    }
  }

  if (items.length === 0) return <p className='p-5 font-mono text-sm text-zinc-600'>empty</p>

  return (
    <>
      <AskDeleteFolderDialog ref={askDeleteFolderDialog} deleteFunction={requestDeleteFolder} />
      <AskDeleteFileDialog ref={askDeleteFileDialog} deleteFunction={requestDeleteFile} />

      <table className='block p-5'>
        <thead>
          <tr className='px-2 block'>
            <th className='w-10'></th>
            <th className='text-sm text-zinc-600 w-52 px-5' align='left'>
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
                <FolderDisplay
                  key={item.name}
                  info={item as ItemInfo<Kind.Dir>}
                  onClick={fs.cd}
                  onRequestDelete={location => requestDeleteFolder(location)}
                />
              )
            }

            if (item.kind === Kind.File) {
              return (
                <FileDisplay
                  key={item.name}
                  info={item as ItemInfo<Kind.File>}
                  onRequestDelete={openAskDeleteFileDialog}
                />
              )
            }
          })}
        </tbody>
      </table>
    </>
  )
}
