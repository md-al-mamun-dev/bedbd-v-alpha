export const store = {
    account:{},
    userTermsAndConditions:[],
    registration:{},
    property:{  
        propertyTypes:[],
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
};