import { useState, useEffect } from 'react'

export type DeviceInfo = {
  width: number
  height: number
  isMobile: boolean
  os: 'Windows' | 'macOS' | 'Linux' | 'Android' | 'iOS' | 'Unknown'
  userAgent: string
  orientation: 'landscape' | 'portrait'
}

const getDeviceInfo = (): DeviceInfo => {
  const width = window.innerWidth
  const height = window.innerHeight
  const userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera || ''
  const platform = navigator.platform || ''

  const isMobile =
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

  let os: DeviceInfo['os'] = 'Unknown'
  if (/Win/i.test(platform)) os = 'Windows'
  else if (/Mac/i.test(platform)) os = 'macOS'
  else if (/Linux/i.test(platform)) os = 'Linux'
  else if (/Android/i.test(userAgent)) os = 'Android'
  else if (/iPhone|iPad|iPod/i.test(userAgent)) os = 'iOS'

  const orientation: DeviceInfo['orientation'] =
    width > height ? 'landscape' : 'portrait'

  return {
    width,
    height,
    isMobile,
    os,
    userAgent,
    orientation
  }
}

export const useDeviceInfo = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() =>
    getDeviceInfo()
  )

  useEffect(() => {
    const handleResize = () => {
      setDeviceInfo(getDeviceInfo())
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return deviceInfo
}
