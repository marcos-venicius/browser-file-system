import React, { useImperativeHandle, useState } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter
} from '~/components/ui/alert-dialog'
import { Button } from '../ui/button'

type Props = {
  deleteFunction(location: Array<string>): void
}

export type AskDeleteFileDialog = {
  open(fileLocation: Array<string>): void
}

export const AskDeleteFileDialog = React.forwardRef<AskDeleteFileDialog, Props>(function Component(
  { deleteFunction },
  ref
) {
  const [fileLocation, setFileLocation] = useState<Array<string> | null>(null)

  useImperativeHandle(ref, () => ({
    open(location) {
      setFileLocation(location)
    }
  }))

  function handleChangeOpenState(state: boolean) {
    if (!state) {
      setFileLocation(null)
    }
  }

  return (
    <AlertDialog
      open={fileLocation !== null}
      defaultOpen={false}
      onOpenChange={handleChangeOpenState}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This action will permanently delete your file.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild onClick={() => deleteFunction(fileLocation || [])}>
            <Button variant='destructive'>delete, permanently</Button>
          </AlertDialogAction>
          <AlertDialogCancel>cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
})
