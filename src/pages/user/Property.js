import React from 'react';
import Propertys from "../../components/property/PropertyList";
import { useSelector } from "react-redux";

const Property = () => {
    const { user } = useSelector((state) => ({ ...state }));    
    return (
        <>
            <h4 className="text-center pt-3">Property</h4>
            <Propertys user={user} />
        </>
    )
}

export default Property;