import { faAngleUp, faAngleDown, faPen, faClock, faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import './FSTimePicker.css'

import {FSNumericTextBox} from '../FSNumericTextBox/FSNumericTextBox'
import { useEffect, useState } from 'react'

const MILLISECONDS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const MILLISECONDS_PER_MINUTE = SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND
const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE
const MILLISECONDS_PER_HOUR = SECONDS_PER_HOUR * MILLISECONDS_PER_SECOND
const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR

export interface FSTimePickerProps {
  title: string
  valueMilliseconds: number
  onChange: (value: number) => void
  showTitle?: boolean

  hideDays?: boolean
  hideHours?: boolean
  hideMinutes?: boolean
  hideSeconds?: boolean
  hideMilliseconds?: boolean
}

interface TimeParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

interface ColumnSizes {
  normal: string
  larger: string
}

export const FSTimePicker = (props: FSTimePickerProps): JSX.Element => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const [timeParts, setTimeParts] = useState<TimeParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  })

  const [columnSizes, setColumnSizes] = useState<ColumnSizes>({ normal: '', larger: '' })

  useEffect(() => {
    updateTimeParts(props.valueMilliseconds)

    let fieldCount = 5

    if (props.hideDays) fieldCount--
    if (props.hideHours) fieldCount--
    if (props.hideMinutes) fieldCount--
    if (props.hideSeconds) fieldCount--
    if (props.hideMilliseconds) fieldCount--

    if (fieldCount === 5) {
      setColumnSizes({ normal: '2', larger: '3' })
    } else {
      const size = (12 / fieldCount).toString()
      setColumnSizes({ normal: size, larger: size })
    }
  }, [])

  useEffect(() => {
    updateTimeParts(props.valueMilliseconds)
  }, [props.valueMilliseconds])

  const updateTimeParts = (milliseconds: number): void => {
    const days = Math.floor(milliseconds / MILLISECONDS_PER_DAY)
    milliseconds -= days * MILLISECONDS_PER_DAY

    const hours = Math.floor(milliseconds / MILLISECONDS_PER_HOUR)
    milliseconds -= hours * MILLISECONDS_PER_HOUR

    const minutes = Math.floor(milliseconds / MILLISECONDS_PER_MINUTE)
    milliseconds -= minutes * MILLISECONDS_PER_MINUTE

    const seconds = Math.floor(milliseconds / MILLISECONDS_PER_SECOND)
    milliseconds -= seconds * MILLISECONDS_PER_SECOND

    milliseconds = Math.floor(milliseconds)

    setTimeParts({
      days,
      hours,
      minutes,
      seconds,
      milliseconds
    })
  }

  const saveValue = (): void => {
    let newValue = timeParts.milliseconds || 0

    newValue += timeParts.seconds * MILLISECONDS_PER_SECOND
    newValue += timeParts.minutes * MILLISECONDS_PER_MINUTE
    newValue += timeParts.hours * MILLISECONDS_PER_HOUR
    newValue += timeParts.days * MILLISECONDS_PER_DAY

    props.onChange(newValue)
    setEditMode(false)
  }

  const setDays = (days: number): void => setTimeParts({ ...timeParts, days })
  const setHours = (hours: number): void => setTimeParts({ ...timeParts, hours })
  const setMinutes = (minutes: number): void => setTimeParts({ ...timeParts, minutes })
  const setSeconds = (seconds: number): void => setTimeParts({ ...timeParts, seconds })
  const setMilliseconds = (milliseconds: number): void => setTimeParts({ ...timeParts, milliseconds })

  const defaultMax = 9999
  const validTimePart = (val: number, maximum: number = defaultMax): number => {
    if (val > maximum) return maximum
    if (val < 0) return 0
    return val
  }

  const dayMax = defaultMax
  const hourMax = props.hideDays ? defaultMax : 23
  const minuteMax = props.hideHours ? defaultMax : 59
  const secondMax = props.hideMinutes ? defaultMax : 59
  const millisMax = props.hideSeconds ? defaultMax : 999

  const validDay = (val: number): number => validTimePart(val, dayMax)
  const validHour = (val: number): number => validTimePart(val, hourMax)
  const validMinute = (val: number): number => validTimePart(val, minuteMax)
  const validSecond = (val: number): number => validTimePart(val, secondMax)
  const validMillis = (val: number): number => validTimePart(val, millisMax)

  const partialUpdateTimeParts = (partialUpdate: (parts: TimeParts) => Partial<TimeParts>): void => setTimeParts(prev => ({ ...prev, ...partialUpdate(prev) }))

  const onSumDay = (): void => partialUpdateTimeParts(t => ({ days: validDay(t.days + 1) }))
  const onSubtractDay = (): void => partialUpdateTimeParts(t => ({ days: validTimePart(t.days - 1) }))

  const onSumHour = (): void => partialUpdateTimeParts(t => ({ hours: validHour(t.hours + 1) }))
  const onSubtractHour = (): void => partialUpdateTimeParts(t => ({ hours: validTimePart(t.hours - 1) }))

  const onSumMinute = (): void => partialUpdateTimeParts(t => ({ minutes: validMinute(t.minutes + 1) }))
  const onSubtractMinute = (): void => partialUpdateTimeParts(t => ({ minutes: validTimePart(t.minutes - 1) }))

  const onSumSecond = (): void => partialUpdateTimeParts(t => ({ seconds: validSecond(t.seconds + 1) }))
  const onSubtractSecond = (): void => partialUpdateTimeParts(t => ({ seconds: validTimePart(t.seconds - 1) }))

  const onSumMillis = (): void => partialUpdateTimeParts(t => ({ milliseconds: validMillis(t.milliseconds + 100) }))
  const onSubtractMillis = (): void => partialUpdateTimeParts(t => ({ milliseconds: validTimePart(t.milliseconds - 100) }))

  return <fieldset className={['row g-0', props.showTitle !== undefined && !props.showTitle ? '' : 'fs-time-picker-fieldset'].join(' ')}>
        {
            props.showTitle !== undefined && !props.showTitle
              ? <></>
              : <legend data-testid="legend" >
                    <FontAwesomeIcon icon={faClock} className="me-1" /> {props.title}
                </legend>
        }

        {
            editMode
              ? <>
                    <div className="col-10">
                        <div className="row g-0 pt-1 pe-1">
                            {
                              !props.hideDays &&
                              <div data-testid="days-edit" className={'col-' + columnSizes.larger}>
                                <button role="add-button" onClick={onSumDay} className="col-12 btn btn-secondary fs-time-picker-btn-up"><FontAwesomeIcon icon={faAngleUp} /></button>
                                <div role="number-input-container" className="col-12 fs-time-picker-info">
                                    <FSNumericTextBox
                                      value={timeParts.days}
                                      onChange={(e: number) => setDays(validDay(e))}
                                      placeholder=''
                                      hideButtons
                                      format={'00d'}
                                      min={0}
                                      max={dayMax}
                                    />
                                </div>
                                <button role="subtract-button" onClick={onSubtractDay} className="col-12 btn btn-secondary fs-time-picker-btn-down"><FontAwesomeIcon icon={faAngleDown} /></button>
                              </div>
                            }

                            {
                              !props.hideHours &&
                                <div data-testid="hours-edit" className={'ps-1 col-' + columnSizes.normal}>
                                  <button role="add-button" onClick={onSumHour} className="col-12 btn btn-secondary fs-time-picker-btn-up"><FontAwesomeIcon icon={faAngleUp} /></button>
                                  <div role="number-input-container" className="col-12 fs-time-picker-info">
                                      <FSNumericTextBox
                                        value={timeParts.hours}
                                        onChange={(e: number) => setHours(validHour(e))}
                                        placeholder=''
                                        hideButtons
                                        format={'00h'}
                                        min={0}
                                        max={hourMax}
                                      />
                                  </div>
                                  <button role="subtract-button" onClick={onSubtractHour} className="col-12 btn btn-secondary fs-time-picker-btn-down"><FontAwesomeIcon icon={faAngleDown} /></button>
                              </div>
                            }

                            {
                              !props.hideMinutes &&
                              <div data-testid="minutes-edit" className={'ps-1 col-' + columnSizes.normal}>
                                  <button role="add-button" onClick={onSumMinute} className="col-12 btn btn-secondary fs-time-picker-btn-up"><FontAwesomeIcon icon={faAngleUp} /></button>
                                  <div role="number-input-container" className="col-12 fs-time-picker-info">
                                      <FSNumericTextBox
                                        value={timeParts.minutes}
                                        onChange={(e: number) => setMinutes(validMinute(e))}
                                        placeholder=''
                                        hideButtons
                                        format={'00min'}
                                        min={0}
                                        max={minuteMax}
                                      />
                                  </div>
                                  <button role="subtract-button" onClick={onSubtractMinute} className="col-12 btn btn-secondary fs-time-picker-btn-down"><FontAwesomeIcon icon={faAngleDown} /></button>
                              </div>
                            }

                            {
                              !props.hideSeconds &&
                              <div data-testid="seconds-edit" className={'ps-1 col-' + columnSizes.normal}>
                                  <button role="add-button" onClick={onSumSecond} className="col-12 btn btn-secondary fs-time-picker-btn-up"><FontAwesomeIcon icon={faAngleUp} /></button>
                                  <div role="number-input-container" className="col-12 fs-time-picker-info">
                                      <FSNumericTextBox
                                        value={timeParts.seconds}
                                        onChange={(e: number) => setSeconds(validSecond(e))}
                                        placeholder=''
                                        hideButtons
                                        format={'00s'}
                                        min={0}
                                        max={secondMax}
                                      />
                                  </div>
                                  <button role="subtract-button" onClick={onSubtractSecond} className="col-12 btn btn-secondary fs-time-picker-btn-down"><FontAwesomeIcon icon={faAngleDown} /></button>
                              </div>
                            }

                            {
                              !props.hideMilliseconds &&
                              <div data-testid="milliseconds-edit" className={'ps-1 col-' + columnSizes.larger}>
                                  <button role="add-button" onClick={onSumMillis} className="col-12 btn btn-secondary fs-time-picker-btn-up"><FontAwesomeIcon icon={faAngleUp} /></button>
                                  <div role="number-input-container" className="col-12 fs-time-picker-info">
                                      <FSNumericTextBox
                                        value={timeParts.milliseconds}
                                        onChange={(e: number) => setMilliseconds(validMillis(e))}
                                        placeholder=''
                                        hideButtons
                                        format={'000ms'}
                                        min={0}
                                        max={millisMax}
                                      />
                                  </div>
                                  <button role="subtract-button" onClick={onSubtractMillis} className="col-12 btn btn-secondary fs-time-picker-btn-down"><FontAwesomeIcon icon={faAngleDown} /></button>
                              </div>
                            }
                        </div>
                    </div>

                    <div className="col-2 pl-1" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                        <button onClick={() => setEditMode(false)} className="btn btn-default"><FontAwesomeIcon icon={faArrowLeft} /></button>
                        <button data-testid="save-button" onClick={saveValue} className="btn btn-primary"><FontAwesomeIcon icon={faSave} /></button>
                    </div>
                </>
              : <div className="col-12 fs-time-picker-show-value px-2">
                    <label>
                        { props.hideDays ? <></> : <span data-testid="days-display" >{timeParts.days?.toString().padStart(2, '0')}</span> }
                        { props.hideHours ? <></> : <span data-testid="hours-display" >{props.hideDays ? '' : 'd '}{timeParts.hours?.toString().padStart(2, '0')}</span> }
                        { props.hideMinutes ? <></> : <span data-testid="minutes-display">{props.hideHours ? '' : ':'}{timeParts.minutes?.toString().padStart(2, '0')}</span> }
                        { props.hideSeconds ? <></> : <span data-testid="seconds-display">{props.hideMinutes ? '' : ':'}{timeParts.seconds?.toString().padStart(2, '0')}</span> }
                        { props.hideMilliseconds ? <></> : <span data-testid="milliseconds-display">{props.hideSeconds ? '' : '.'}{timeParts.milliseconds?.toString().padStart(3, '0')}</span> }
                    </label>

                    <button data-testid="edit-button" onClick={() => setEditMode(true)} className="btn btn-outline-dark ms-2 mt-3"><FontAwesomeIcon icon={faPen} /></button>
                </div>
        }
    </fieldset>
}