import styles from './layout.module.css'
import Header from './header/header.js'
import SideMenu from './sidemenu/SideMenu'

export default function Layout( { children } ) {
   return (
      <>
         <Header/>
         <div className = {styles.main}>
            <SideMenu/>
            {children}
         </div>        
      </>
   )
}
