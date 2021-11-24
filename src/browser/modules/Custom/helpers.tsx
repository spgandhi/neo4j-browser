export const filterCypherFrames = (frames: any[]) => {
  return frames.filter(frame => frame.stack[0].type === 'cypher')
}
