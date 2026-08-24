package com.propertyhub.controller;

import com.propertyhub.entity.Property;
import com.propertyhub.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/{id}")
    public Optional<Property> getPropertyById(
            @PathVariable Long id) {

        return propertyService.getPropertyById(id);
    }

    @PostMapping
    public Property addProperty(
            @RequestBody Property property) {

        return propertyService.saveProperty(property);
    }

    @PutMapping("/{id}")
    public Property updateProperty(
            @PathVariable Long id,
            @RequestBody Property property) {

        return propertyService.updateProperty(id, property);
    }

    @DeleteMapping("/{id}")
    public String deleteProperty(
            @PathVariable Long id) {

        propertyService.deleteProperty(id);

        return "Property deleted successfully.";
    }
}