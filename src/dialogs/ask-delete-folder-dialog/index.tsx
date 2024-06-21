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
import { Button } from '../../components/ui/button'

type Props = {
  deleteFunction(location: Array<string>, force: boolean): void
}

export type AskDeleteFolderDialog = {
  open(folderLocation: Array<string>): void
}

export const AskDeleteFolderDialog = React.forwardRef<AskDeleteFolderDialog, Props>(
  function Component({ deleteFunction }, ref) {
    const [folderLocation, setFolderLocation] = useState<Array<string> | null>(null)

    useImperativeHandle(ref, () => ({
      open(location) {
        setFolderLocation(location)
      }
    }))

    function handleChangeOpenState(state: boolean) {
      if (!state) {
        setFolderLocation(null)
      }
    }

    return (
      <AlertDialog
        open={folderLocation !== null}
        defaultOpen={false}
        onOpenChange={handleChangeOpenState}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Directory not empty</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your folder and respective
              children
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild onClick={() => deleteFunction(folderLocation || [], true)}>
              <Button variant='destructive'>delete everything</Button>
            </AlertDialogAction>
            <AlertDialogCancel>cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
)
