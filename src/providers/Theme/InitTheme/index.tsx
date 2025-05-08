import Script from 'next/script'
import React from 'react'

export const InitTheme: React.FC = () => {
  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    document.documentElement.setAttribute('data-theme', 'dark')
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
