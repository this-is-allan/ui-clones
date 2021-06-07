export interface MoveProps {
  fromList: number
  toList: number
  from: number
  to: number
}

export interface CardProps {
  id: number
  content?: string
  labels?: string[]
  user?: string
}

export interface ListsProps {
  title?: string
  creatable?: boolean
  done?: boolean
  cards?: CardProps[]
}

export interface ListProps {
  data: ListsProps
  index: number
}

// contexts
export interface BoardContext {
  lists: ListsProps[]
  move: (fromList: number, toList: number, from: number, to: number) => void
}
