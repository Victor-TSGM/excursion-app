import { LayoutContext } from '../../../presentation/providers/LayoutStateProvider'
import * as React from 'react'

import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  DialogOpenChangeEvent,
  DialogOpenChangeData,
} from "@fluentui/react-components";

export const FSDialogComponent = (): JSX.Element => {
  const { layoutState, setLayoutState } = React.useContext(LayoutContext)

  const onClose = (): void => {
    setLayoutState({ ...layoutState, showDialog: false })
  }

  return <>
    <Dialog open={layoutState.showDialog} onOpenChange={(event: DialogOpenChangeEvent, data: DialogOpenChangeData) => onClose()}>
      <DialogSurface>
        <DialogBody>
          <DialogContent>
            {layoutState.dialogConfig.content}
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" onClick={() => {
                layoutState.dialogConfig.onCancel()
                onClose()
              }}>
                Cancelar
              </Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={() => {
              layoutState.dialogConfig.onContinue()
              onClose()
            }}>
              OK
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  </>
}