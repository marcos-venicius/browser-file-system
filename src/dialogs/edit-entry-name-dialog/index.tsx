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
import { Kind } from '~/types'

type Props = {
  fs: UseFileSystem
}

export type EditEntryNameDialog = {
  open(location: Array<string>): void
}

interface IFormInputs {
  name: string
}

const fileSchema = z.object({
  name: z
    .string()
    .regex(settings.VALID_FILE_NAME_REGEX, 'invalid filename name')
    .trim()
    .min(1, 'invalid filename name')
})

const directorySchema = z.object({
  name: z
    .string()
    .regex(settings.VALID_FOLDER_NAME_REGEX, 'invalid folder name')
    .trim()
    .min(1, 'invalid folder name')
})

export const EditEntryNameDialog = React.forwardRef<EditEntryNameDialog, Props>(
  function EditEntryDialogComponent({ fs }, ref) {
    const [open, setOpen] = useState(false)
    const [location, setLocation] = useState<Array<string>>([])
    const [kind, setKind] = useState<Kind | null>(null)

    const fileForm = useForm<IFormInputs>({
      defaultValues: {
        name: ''
      },
      resolver: zodResolver(fileSchema)
    })

    const directoryForm = useForm<IFormInputs>({
      defaultValues: {
        name: ''
      },
      resolver: zodResolver(directorySchema)
    })

    useImperativeHandle(ref, () => ({
      open(fileLocation) {
        setLocation(fileLocation)

        const result = fs.file(fileLocation)

        if (result.error) {
          toast.error(result.message)

          return
        }

        switch (result.data) {
          case Kind.File:
            fileForm.setValue('name', fileLocation.at(-1)!)
            break
          case Kind.Dir:
            directoryForm.setValue('name', fileLocation.at(-1)!)
            break
          default:
            break
        }

        setKind(result.data)
        setOpen(true)
      }
    }))

    function form() {
      if (kind === Kind.File) return fileForm
      return directoryForm
    }

    function onChangeOpenState(state: boolean) {
      if (!state) {
        form().reset()
      }

      setOpen(state)
    }

    function onSubmit(data: IFormInputs) {
      const result = fs.rename(location, data.name);

      if (result.error) {
        return toast.error(result.message)
      }

      setOpen(false)
      form().reset({
        name: ''
      })
    }

    return (
      <Dialog open={open} modal defaultOpen={false} onOpenChange={onChangeOpenState}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit name</DialogTitle>
          </DialogHeader>

          {kind !== null && (
            <Form {...form()}>
              <form onSubmit={form().handleSubmit(onSubmit)}>
                <FormField
                  control={form().control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className='block mt-5 ml-auto'>save</Button>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    )
  }
)
