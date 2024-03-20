import styles from './index.module.css'

const CircularChart = () => {

  
  return (
    <div className={`${styles.chart_body} marker-class`}>
        
        <div className='marker-class w-fit-content'>
        <svg width="172" height="172" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="86"
            cy="86"
            r="72"  
            fill="none"
            stroke="#eee"
            stroke-width="28"/>

          <circle
            cx="86"
            cy="86"
            r="72"  
            fill="none"
            stroke="#4CAF50"
            stroke-width="28" 
            stroke-dasharray="250.65" 

            // stroke-dasharray="502.65" 
            stroke-dashoffset="240.08" 
          />
        </svg>


        {/* Repeat for other charts as needed */}
        </div>



    </div>
  )
}

export default CircularChart