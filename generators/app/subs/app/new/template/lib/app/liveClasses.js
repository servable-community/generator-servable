

export default async () => {
  return process.env.SERVABLE_LIVESERVER_CLASSES ? JSON.parse(process.env.SERVABLE_LIVESERVER_CLASSES) : []
}
