import { Folder, FolderDown, FolderOpen, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export enum NodeKind {
  Dir,
  File
}

type Props = {
  kind: NodeKind
  name: string
}

export function Node({ kind, name }: Props) {
  const [open, setOpen] = useState(false);

  if (kind === NodeKind.Dir) {
    return (
      <div className="w-full border rounded">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 hover:bg-zinc-100 p-5 rounded">
            {open ? <FolderOpen className="text-blue-600" /> : <Folder className="text-blue-600" />}

            <p className="font-normal text-zinc-600">{name}</p>
          </div>

          <div className="flex items-center gap-3 bg-red-100 h-full">
            <Button variant='ghost' size="icon">
              <Plus className="text-blue-600" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null;
}
