export default class Platform {
  isIOS () {
    return Boolean(navigator.platform.match(/(iPhone|iPad|iPod)/i))
  }
  isAndroid () {
    return Boolean(navigator.userAgent.match(/Android/i))
  }

  isMobile () {
    return Boolean(navigator.platform.match(/(iPhone|iPad|iPod|Android)/i))
  }

  isMac () {
    return Boolean(navigator.platform.match(/(Mac)/i))
  }

  isLinux () {
    return Boolean(navigator.platform.match(/(Linux)/i))
  }

  isWindows () {
    return Boolean(navigator.platform.match(/(Win32|Windows)/i))
  }

  isDesktop () {
    return Boolean(navigator.platform.match(/(Win32|Windows|Mac|Linux)/i))
  }

  getPlatform () {
    return navigator.platform
  }
}
