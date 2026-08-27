export default defineEventHandler(async (event) => {
  const { smartformifyEndpoint } = useRuntimeConfig(event).public
  if (!smartformifyEndpoint) throw createError({ statusCode: 500, statusMessage: 'Form endpoint is not configured.' })
  const body = await readBody(event)
  return $fetch(smartformifyEndpoint, { method: 'POST', body })
})
