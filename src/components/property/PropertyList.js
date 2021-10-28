import React from "react";
import PropertyCard from "../cards/PropertyCard";


const PropertyList = ({user}) => {
  
  return (
    <>
      <div className="container">
        <div className="row">
          {user.propertys && user.propertys.length > 0 ? (
            user.propertys.map((property) => (
              <div className="col-md-4">
                <PropertyCard key={property.key} property={property} />
              </div>
            ))
          ) :
            (<h4 className="text-center">You don't have an associated department.</h4>)
          }
        </div>
      </div>
    </>
  );
};

export default PropertyList;