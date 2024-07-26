import React from 'react'
import "@styles/global.css";

import  Navbar  from "@components/Navbar";
import  Provider  from "@components/Provider";

export const metadata = {
    title: "Share Prompts",
    description: "Discover & Share AI Propmts"
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>
                <main className='app'>
                    <Navbar />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}


export default RootLayout