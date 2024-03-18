import * as React from 'react'
import './FSTreeView.css'

import {
  Tree,
  TreeItemLayout,
  TreeItem,
  TreeItemOpenChangeData,
  TreeCheckedChangeData,
  TreeItemValue,
} from "@fluentui/react-components";

export interface FSTreeViewProps<T> {
  dataSource: T[]

  idField: keyof T
  textField: keyof T
  childField: keyof T

  checkedIds?: any[]
  onCheckChange?: (ids: any[]) => void

  openIds?: any[]

  allOpen?: boolean
  allChecked?: boolean

  selectionMode: 'single' | 'multiselect' | 'none'
}

export const FSTreeView = <T,>(props: FSTreeViewProps<T>): JSX.Element => {
  const [checkedItems, setCheckedItems] = React.useState<any[]>(props.checkedIds)
  const [openItems, setOpenItems] = React.useState<any[]>(props.openIds)

  React.useEffect(() => {
    let newOpenItems = []

    if (props.allOpen) {
      for (let index = 0; index < props.dataSource.length; index++) {
        newOpenItems = GetItemCheckedIds(props.dataSource[index], newOpenItems)
      }
    }

    setOpenItems(newOpenItems)
  }, [props.allOpen])

  React.useEffect(() => {
    props.onCheckChange?.(checkedItems)
  }, [checkedItems])

  const IsLeafItem = (item: T): boolean => {
    return item[props.childField] === undefined
  }

  const FindItemById = (id: any): T | null => {
    const CheckIdInChild = (item: T, id: any): T | null => {
      if (item[props.idField] === id) {
        return item
      }

      if (IsLeafItem(item)) {
        return null
      }

      let children: T[] = item[props.childField] as T[]

      for (let childIndex = 0; childIndex < children.length; childIndex++) {
        let result = CheckIdInChild(children[childIndex], id)

        if (result !== null) {
          return result
        }
      }

      return null
    }

    for (let index = 0; index < props.dataSource.length; index++) {
      let result = CheckIdInChild(props.dataSource[index], id)

      if (result !== null) {
        return result
      }
    }

    return null
  }

  const GetItemCheckedIds = (item: T, itemsId: any[]): any[] => {
    itemsId.push(item[props.idField])

    if (!IsLeafItem(item)) {
      let children = item[props.childField] as T[]

      for (let index = 0; index < children.length; index++) {
        const child = children[index]

        itemsId = GetItemCheckedIds(child, itemsId)
      }
    }

    return itemsId
  }

  const RenderTreeItem = (item: T) => {
    const isLeaf = IsLeafItem(item)
    const itemId = item[props.idField].toString()

    return <TreeItem
      itemType={isLeaf ? "leaf" : "branch"}
      value={item[props.idField] as TreeItemValue}
      key={`${itemId}`}

      open={openItems !== undefined && openItems.includes(item[props.idField])}

      onOpenChange={(_, data: TreeItemOpenChangeData) => {
        let auxOpenItems = openItems || []

        if (data.open) {
          auxOpenItems.push(item[props.idField])
        }
        else {
          auxOpenItems = auxOpenItems.filter(s => s !== item[props.idField])
        }

        setOpenItems([...auxOpenItems])
      }}
    >
      <TreeItemLayout>{item[props.textField].toString()}</TreeItemLayout>

      {
        !isLeaf ? <Tree aria-labelledby={`${itemId}_children`}>
          {
            (item[props.childField] as Array<T>).map((item: T) => RenderTreeItem(item))
          }
        </Tree> : <></>
      }
    </TreeItem>
  }

  return <Tree
    aria-labelledby='fs-tree-view'
    selectionMode={props.selectionMode !== 'none' ? props.selectionMode : undefined}

    checkedItems={checkedItems}
    onCheckedChange={(_, data: TreeCheckedChangeData) => {
      if (props.selectionMode === 'single' && data.checked) {
        setCheckedItems([data.value])
        return
      }

      let item = FindItemById(data.value)
      let auxCheckedItems = checkedItems || []

      let itemsId = GetItemCheckedIds(item, [])

      if (data.checked) {
        auxCheckedItems.push(...itemsId)
      }
      else {
        auxCheckedItems = auxCheckedItems.filter(s => !itemsId.includes(s))
      }

      setCheckedItems([...auxCheckedItems])
    }}
  >
    {
      props.dataSource.map((s: any) => RenderTreeItem(s))
    }
  </Tree>
}