import styles from './actionbar.module.css'

const ActionBar = () =>  {
   return (
      <div className={styles.actionbar}>
         <button>Details</button>
         <button>Delete</button>
      </div>
   )
}

export default ActionBar;