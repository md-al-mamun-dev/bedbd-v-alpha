export const store = {
    account:{},
    userTermsAndConditions:[],
    registration:{},
    property:{  
        propertyTypes:[],
        propertyCircumferences:[],
        bookingTypes:[],

        selectedBookingType:[],

        propertyFeatures:[],
        selectedPropertyFeatures:[],

        countryList:[],
        selectedPropertyType:'',
        
        title:'',
        address:{   aptFloor: '', 
                    streetAddress: '', 
                    addressOne: '', 
                    addressTwo: ''},
        // country:'',
        // countryCode:'',

        country:{name: '', code: ''},
        city:{ name:'', lat:'', lng:'' },
        district:{ name:'', lat:'', lng:'' },
        thana:{},
        timeZone:'',
        zipCode:'',
        location:{},
        roomCount:[],
        bedCount:[],
        guestCount:[],

        homeRules:[],
        selectedHomeRules:[],

        checkInTime:[],
        checkOutTime:[],
        
        propertyDescription:'',
        images:[],
        rentInfo:{},
        amenities:[],
        selectedAmenities:[],
        availability:{
            checkIn:'',
            monthExtendStay:'',
            rebookAfterTimeFrame:''
        },
        approvingMethod:'',
        genderPref:'',
        termsConditions:{
            legitimateDeclaration:false,
            readTermsCondition:false
        }
    },
    search:{
        location:{
            latitude:23.82439436458189,
            longitude:90.36203892315308
        },
        dateRange:[],
        guestCount: {
            totalGuestCount: 0,
            adult: 0,
            child: 0,
            pet: 0,
            bellow12:0,
        },
        propertyType:'',
        propertyFeatures:[],
        areaRange:'',
        priceRange: '',
        rating: 0.00,
        amenities: [],
        badges:[],
        genderPreference:'',
    }
};