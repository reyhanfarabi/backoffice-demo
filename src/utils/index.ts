export const setAppColorMode = (): void => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export const switchColorMode = (): void => {
  if (localStorage.theme === 'dark') {
    // set color mode to light
    localStorage.theme = 'light'
    document.documentElement.classList.remove('dark')
  } else {
    // set color mode to dark
    localStorage.theme = 'dark'
    document.documentElement.classList.add('dark')
  }
}
