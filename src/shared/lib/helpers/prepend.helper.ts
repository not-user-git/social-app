import { CONFIG } from '../../model/config'
export const prependUrl = (path: string) =>
  `${CONFIG.API}${path.replace(CONFIG.API, '')}`
