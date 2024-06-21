import React, { useImperativeHandle, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { UseFileSystem } from '~/hooks/use-file-system'
import { Input } from '~/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { settings } from '~/settings'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../components/ui/button'
import { toast } from 'sonner'

type Props = {
  fs: UseFileSystem
}

export type CreateFolderDialog = {
  open(): void
}

interface IFormInputs {
  name: string
}

const schema = z.object({
  name: z
    .string()
    .regex(settings.VALID_FOLDER_NAME_REGEX, 'invalid folder name')
    .trim()
    .min(1, 'invalid folder name')
})

export const CreateFolderDialog = React.forwardRef<CreateFolderDialog, Props>(
  function CreateFolderDialogComponent({ fs }, ref) {
    const [open, setOpen] = useState(false)
    const form = useForm<IFormInputs>({
      defaultValues: {
        name: ''
      },
      resolver: zodResolver(schema)
    })

    useImperativeHandle(ref, () => ({
      open() {
        setOpen(true)
      }
    }))

    function onChangeOpenState(state: boolean) {
      if (!state) {
        form.reset()
      }

      setOpen(state)
    }

    function onSubmit(data: IFormInputs) {
      const result = fs.mkdir(data.name)

      if (result.error) {
        return toast.error(result.message)
      }

      setOpen(false)
      form.reset({
        name: ''
      })
    }

    return (
      <Dialog open={open} modal defaultOpen={false} onOpenChange={onChangeOpenState}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New folder</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Folder name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className='block mt-5 ml-auto'>create</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
  }
)
