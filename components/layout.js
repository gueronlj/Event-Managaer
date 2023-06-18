import styles from './layout.module.css'
import Header from './header/header.js'

export default function Layout( { children } ) {
   return (
      <>
         <Header/>
         {children}
      </>)
}
