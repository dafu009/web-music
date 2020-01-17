export const ERR_OK: number = 200
export interface RST {
  type: 'success' | 'error' | 'warning'
  message: string
  success: boolean
}