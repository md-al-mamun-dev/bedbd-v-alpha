export default function searchReducers(initialData, {type, data}) {
    switch (type) {
        
        case "search/location": {
            return {
                ...initialData, 
                location:{
                    latitude:data['latitude'],
                    longitude:data['longitude']
                }}
          }
        case "search/dateRange": {
        return {
            ...initialData, 
            dateRange:data}
        }
        case "search/incrementGuest": {
        return {
            ...initialData, 
            guestCount:{
                ...initialData['guestCount'],
                totalGuestCount: initialData['guestCount']['totalGuestCount'] + data
            }}
        }
        case "search/decrementGuest": {
        
            return {
                ...initialData,
                guestCount:{
                    ...initialData['guestCount'],
                    totalGuestCount: ((initialData['guestCount']['totalGuestCount'] - data) > -1) 
                                                ? initialData['guestCount']['totalGuestCount'] - data
                                                : 0
                }}
        }
        case "search/guestCount": {
            return {
                ...initialData, 
                guestCount:{
                    ...initialData['guestCount'],
                    totalGuestCount: data
                }}
            }

        case "search/selectedPropertyType": {        
            return {
                ...initialData,
                propertyType: data
            }
        }

        case "search/addFeature": {        
            return {
                ...initialData,
                propertyFeatures: [...initialData['propertyFeatures'], data]
            }
        }

        case "search/removeFeature": {        
            return {
                ...initialData,
                propertyFeatures: initialData['propertyFeatures'].filter(item=>item!=data)
            }
        }

        case "search/addAmenity": {        
            return {
                ...initialData,
                amenities: [...initialData['amenities'], data]
            }
        }

        case "search/removeAmenity": {        
            return {
                ...initialData,
                amenities: initialData['amenities'].filter(item=>item!=data)
            }
        }

        default: {
            throw Error(`No action matched with ${action.type}`);
        }
    }
}