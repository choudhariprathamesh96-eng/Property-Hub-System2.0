package com.propertyhub.service;

import com.propertyhub.entity.Property;
import com.propertyhub.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    // =====================================
    // Save Property
    // =====================================

    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    // =====================================
    // Get All Properties
    // =====================================

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    // =====================================
    // Get Property By ID
    // =====================================

    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    // =====================================
    // Update Property
    // =====================================

    public Property updateProperty(Long id, Property property) {

        Property existingProperty =
                propertyRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Property not found with ID: " + id
                                )
                        );

        // Basic Information
        existingProperty.setTitle(property.getTitle());
        existingProperty.setDescription(property.getDescription());

        // Location
        existingProperty.setLocation(property.getLocation());
        existingProperty.setState(property.getState());
        existingProperty.setAddress(property.getAddress());

        // Price & Type
        existingProperty.setPrice(property.getPrice());
        existingProperty.setType(property.getType());
        existingProperty.setStatus(property.getStatus());

        // Property Details
        existingProperty.setArea(property.getArea());
        existingProperty.setFloor(property.getFloor());
        existingProperty.setBedrooms(property.getBedrooms());
        existingProperty.setBathrooms(property.getBathrooms());

        // Additional Details
        existingProperty.setParking(property.getParking());
        existingProperty.setFurnished(property.getFurnished());

        // Owner Details
        existingProperty.setOwner(property.getOwner());
        existingProperty.setMobile(property.getMobile());

        // Image
        existingProperty.setImage(property.getImage());

        // Save updated property
        return propertyRepository.save(existingProperty);
    }

    // =====================================
    // Delete Property
    // =====================================

    public void deleteProperty(Long id) {

        if (!propertyRepository.existsById(id)) {

            throw new RuntimeException(
                    "Property not found with ID: " + id
            );
        }

        propertyRepository.deleteById(id);
    }
}