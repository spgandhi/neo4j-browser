import mixpanel from 'mixpanel-browser'

const EVENT_PREFIX = 'TEST_DRIVE'

export const filterCypherFrames = (frames: any[]): any[] => {
  return frames.filter(frame => frame.stack[0].type === 'cypher')
}

export const trackEvent = (eventName: string, properties: any = {}): void => {
  const refinedEventName = `${EVENT_PREFIX}_${eventName
    .toUpperCase()
    .split(' ')
    .join('_')}`
  mixpanel.track(refinedEventName, properties)
}

export const generateQueryWithComment = (
  query: string,
  comment: string
): string => {
  if (comment && comment !== '') {
    return `// ${comment}\n${query}`
  }
  return query
}
