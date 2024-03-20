import styles from './index.module.css'
import LucidIcon from '@/components/LucidIcon'

const CancellationPolicy = () => {
    const data = [
                    {
                        timelimit: 24,
                        timeFormat:'hour',
                        refundRate: 50,
                    },{
                        timelimit: 48,
                        timeFormat:'hour',
                        refundRate: 60,
                    },{
                        timelimit: 72,
                        timeFormat:'hour',
                        refundRate: 70,
                    },{
                        timelimit: 96,
                        timeFormat:'hour',
                        refundRate: 80,
                    },{
                        timelimit: 120,
                        timeFormat:'hour',
                        refundRate: 95,
                    },{
                        timelimit: 168,
                        timeFormat:'hour',
                        refundRate: 100,
                    }
                ]

const sortedData = data.sort((a, b) => a['timelimit'] - b['timelimit'])
const dataLength = sortedData.length


const generatedRules = sortedData.map((item, index) => {                        
                            // const maxlimit =   sortedData[index + 1] 
                            const minLimitDay = item.timelimit/24
                            const minLimit =  minLimitDay > 2 ? ' ' + minLimitDay + ' days (' + item.timelimit + ' hours) ': ' ' +item.timelimit+ ' hours ';

                            
                            if( index < dataLength-1 ){
                                let maxLimitDay = sortedData[index + 1].timelimit/24;
                                const maxLimit =  maxLimitDay > 2 ? ' ' + maxLimitDay + ' days (' + sortedData[index + 1].timelimit + ' hours) ': ' ' +sortedData[index + 1].timelimit+ ' hours ';
                                return  <div className={`${styles.rule}`}>
                                            <LucidIcon name='info' size='24'/>
                                            <div> Cancle anytime between 
                                                <span>{ minLimit }</span> 
                                                and 
                                                <span>{ maxLimit }</span>  
                                                before check-in, you will get 
                                                <span> {item['refundRate']}%</span> refund.
                                            </div>                                            
                                        </div>
                                }
                            if(index === dataLength-1 ){                                
                                return  <div className={`${styles.rule}`}>
                                            <LucidIcon name='info' size='24'/>
                                            <div>
                                                Cancle anytime between 
                                                <span>{ minLimit } </span>
                                                or more before check-in, you will get 
                                                {' '+item['refundRate']}% refund.
                                            </div>
                                        </div>
                            }                        
                        })



  return (
    <div>
        <h3 className={`${styles.title} `}>Cancellation Policy</h3>
        <div className={`${styles.policies}`}>
            <div className={`${styles.rule}`}>
                <LucidIcon name='info' size='24'/>
                <div>
                    Cancle within 
                    <span>{' '+sortedData[0]['timelimit']} hours </span>, 
                    or less before check-in there will be no refund
                </div>
            </div>

            { generatedRules }
            
            <div className={`${styles.rule}`}>
                <LucidIcon name='info' size='24'/>                
                <div>all refund exclude bedbd fee</div>
            </div>
        </div>

    </div>
  )
}

export default CancellationPolicy