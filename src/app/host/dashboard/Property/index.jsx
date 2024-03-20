import styles from './index.module.css'
import PropertyItem from './PropertyItem'
// import sampleImg from '@/../public/images/dab98b8e77b48c65d7c3e2032f00af6c.jpeg'

const Property = () => {

let viewType = 'list'



const data =    [
                    {
                        'id':0,
                        'uid': 'DHK-12546213',
                        'name':'Property A',
                        'thumbnailUrl':'/images/dab98b8e77b48c65d7c3e2032f00af6c.jpeg',
                        'address':'Sector-13, Uttora, Dhaka north'
                    }, {
                        'id':1,
                        'uid': 'DHK-12546214',
                        'name':'Property B',
                        'thumbnailUrl':'/images/dab98b8e77b48c65d7c3e2032f00af6c.jpeg',
                        'address':'Sector-13, Uttora, Dhaka north'
                    }, {
                        'id':2,
                        'uid': 'DHK-12546215',
                        'name':'Property C',
                        'thumbnailUrl':'/images/dab98b8e77b48c65d7c3e2032f00af6c.jpeg',
                        'address':'Sector-13, Uttora, Dhaka north'
                    }, {
                        'id':3,
                        'uid': 'DHK-12546216',
                        'name':'Property D',
                        'thumbnailUrl':'/images/dab98b8e77b48c65d7c3e2032f00af6c.jpeg',
                        'address':'Sector-13, Uttora, Dhaka north'
                    }, {
                        'id':2,
                        'uid': 'DHK-12546217',
                        'name':'Property E',
                        'thumbnailUrl':'/images/dab98b8e77b48c65d7c3e2032f00af6c.jpeg',
                        'address':'Sector-13, Uttora, Dhaka north'
                    }, {
                        'id':3,
                        'uid': 'DHK-12546218',
                        'name':'Property F',
                        'thumbnailUrl':'/images/dab98b8e77b48c65d7c3e2032f00af6c.jpeg',
                        'address':'Sector-13, Uttora, Dhaka north'
                    }, {
                        'id':4,
                        'uid': 'DHK-12546219',
                        'name':'Property G',
                        'thumbnailUrl':'/images/dab98b8e77b48c65d7c3e2032f00af6c.jpeg',
                        'address':'Sector-13, Uttora, Dhaka north'
                    }, {
                        'id':5,
                        'uid': 'DHK-12546220',
                        'name':'Property H',
                        'thumbnailUrl':'/images/dab98b8e77b48c65d7c3e2032f00af6c.jpeg',
                        'address':'Sector-13, Uttora, Dhaka north'
                    }
                ]


  return (
    <div className={` w-100 mr-48-32-16-32 p-72-24-24-24 radius-8 bg-secondary-050 ${viewType==='list' ? 'fs-regular flex flex-col gap-16' : 'grid grid-col-3 col-gap-24 row-gap-40 h-max-content'}`}>
        <div className={`p-l-r-24 fw-regular-dark border-neutral-100 min-h-56 bg-neutral-000 radius-8 align-center grid grid-tmp-col-96-224-254-auto ${viewType==='grid' && 'display-none'}`}>
            <div>SI No.</div>
            <div>Property ID</div>
            <div>Property Name</div>
            <dvi className='txt-right'>Actions</dvi>
        </div>
        
            {
                data.map( (property, idx) =><PropertyItem key={property['id']} data={property} siNo={idx} viewType={viewType}/> )
            }
    </div>
  )
}

export default Property