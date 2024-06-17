import React from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '~/components/ui/context-menu'

type Props = {
  children: React.ReactNode
  render: Array<React.ReactNode>
}

export function CustomContextMenu({ children, render }: Props) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>{React.Children.toArray(render)}</ContextMenuContent>
    </ContextMenu>
  )
}

type OptionProps = {
  children: string
  onClick?(): void
  icon?: React.ReactNode
}

function Option({ children, icon, onClick }: OptionProps) {
  return (
    <ContextMenuItem className='flex gap-3 items-center' onClick={onClick}>
      {icon}
      {children}
    </ContextMenuItem>
  )
}

CustomContextMenu.Option = Option
