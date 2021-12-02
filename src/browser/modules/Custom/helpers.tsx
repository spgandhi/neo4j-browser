import mixpanel from 'mixpanel-browser'

const EVENT_PREFIX = 'TEST_DRIVE'

export const filterCypherFrames = (frames: any[]) => {
  return frames.filter(frame => frame.stack[0].type === 'cypher')
}

export const trackEvent = (eventName: string, properties: any = {}) => {
  const refinedEventName = `${EVENT_PREFIX}_${eventName
    .toUpperCase()
    .split(' ')
    .join('_')}`
  mixpanel.track(refinedEventName, properties)
}
