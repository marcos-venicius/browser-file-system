import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { UseFileSystem } from '~/hooks/use-file-system'

type Props = {
  fs: UseFileSystem
}

function fileContent(fs: UseFileSystem) {
  if (!fs.openedFile) return ''

  const content = fs.read(fs.openedFile)

  if (content.error) {
    toast.error(content.error)
    fs.close()

    return ''
  }

  return content.data ?? ''
}

export function Cat({ fs }: Props) {
  const [value, setValue] = useState(fileContent(fs))
  const [mounted, setMounted] = useState(false)
  const timer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (mounted) {
      if (timer.current) clearTimeout(timer.current)

      timer.current = setTimeout(() => {
        toast.info('file saved')
        fs.echo(value)
      }, 1000)
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <textarea
      className='block focus:border-none focus:outline-none focus-visible:border-none w-full h-textarea p-5 bg-white resize-none whitespace-pre font-mono text-sm text-zinc-950'
      autoCorrect='off'
      autoComplete='off'
      spellCheck={false}
      onChange={e => setValue(e.target.value)}
      value={value}></textarea>
  )
}
