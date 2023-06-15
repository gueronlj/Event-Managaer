import Header from '../components/header/header.js'
import styles from './layout.module.css'

export default function Layout( { children } ) {
   return (
      <>
         <Header/>
         {children}
      </>)
}
