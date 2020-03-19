import React from 'react'
import Headroom from 'react-headroom'
import {Container} from 'semantic-ui-react'
import Footer from '../Footer'
import Header from '../Header'
import 'semantic-ui-css/semantic.min.css'
import {CookiesProvider, useCookies} from 'react-cookie'

const Layout = ({location, children}) => {
  const [cookies, setCookies] = useCookies(['token']);
  return (
    <CookiesProvider>
      <Headroom
        upTolerance={10}
        downTolerance={10}
        style={{zIndex: '20', height: '6.5em'}}
      >
        <Header location={location} />
  <p>{cookies.token}</p>
      </Headroom>
      <Container text>{children}</Container>
      <Footer />
    </CookiesProvider>
  )
}

export default Layout
