import * as React from 'react'
import { useImperativeHandle } from 'react'
import { SearchItemDisplayBuilder } from './SearchItemDisplayBuilder'
import { SearchModal, SearchModalActions } from './SearchModal'

export class SearchModalWrapperProps {
  modalTitle: string
  displayFieldName: string
  searchPage: JSX.Element
  editorPage: JSX.Element
  onChange: (selectedEntities: any[]) => void
  initialItems? = []
  multiselect? = false
  disabled? = false
  hideEditor? = false
}

export interface SearchModalWrapperActions {cleanItems: () => void}

export const SearchModalWrapper = React.forwardRef((props: SearchModalWrapperProps, ref: React.ForwardedRef<SearchModalWrapperActions>) => {
  const [selectedEntities, setSelectedEntities] = React.useState<any[]>(props.initialItems)
  const [editingItemId, setEditingItemId] = React.useState(0)
  const canSetInitialItems = React.useRef(true)

  const searchModalRef = React.useRef<SearchModalActions>(null)

  useImperativeHandle(ref, () => ({ cleanItems: () => updateSelectedEntities([]) }))

  React.useEffect(() => {
    if (!canSetInitialItems.current) return
    if (!props.initialItems || props.initialItems.length <= 0) return
    if (selectedEntities && selectedEntities.length > 0) return
    setSelectedEntities(props.initialItems)
    canSetInitialItems.current = false
  }, [props.initialItems])

  const updateSelectedEntities = (newValues: any[]): void => {
    setSelectedEntities(newValues)
    props.onChange(newValues)
  }

  const onRemoveItem = (itemId: any): void => {
    updateSelectedEntities(selectedEntities?.filter(item => item.id !== itemId))
  }

  const onEditItem = (itemId: number): void => {
    if (!props.hideEditor) {
      setEditingItemId(itemId)
      searchModalRef.current.openEditorModal()
    }
  }

  const onCloseEditor = (entity?: any): void => {
    const oldEditingId = editingItemId
    searchModalRef.current.closeEditorModal()
    setEditingItemId(0)
    if (!entity) return

    if (!props.multiselect) {
      updateSelectedEntities([entity])
      return
    }

    // if is returning from a editing
    if (oldEditingId !== 0) {
      const newSelectedEntities = selectedEntities?.map(se => se.id === oldEditingId ? entity : se)
      updateSelectedEntities(newSelectedEntities)
      return
    }
    updateSelectedEntities([...selectedEntities || [], entity])
  }

  const onSelectEntities = (items: any[]): void => {
    searchModalRef.current.closeSearchModal()
    updateSelectedEntities(items)
  }

  return (
    <SearchModal ref={searchModalRef}
      title={props.modalTitle}
      listDisplay={SearchItemDisplayBuilder.Generate(selectedEntities, props.displayFieldName, props.multiselect, onRemoveItem, onEditItem, props.disabled)}
      editorPage={React.cloneElement(props.editorPage, { id: editingItemId, onClose: onCloseEditor })}
      showCleanItem={!props.multiselect && selectedEntities?.length === 1}
      onCleanItem={() => onRemoveItem(selectedEntities[0]?.id)}
      multiselect={props.multiselect} disabled={props.disabled} hideEditor={props.hideEditor}
    >
      {React.cloneElement(props.searchPage, { onSelect: onSelectEntities, selectedEntities, multiselectMode: props.multiselect, isSearchMode: true })}
    </SearchModal>
  )
})

SearchModalWrapper.displayName = 'SearchModalWrapper'