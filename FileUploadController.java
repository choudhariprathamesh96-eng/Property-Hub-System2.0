package com.propertyhub.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/upload")
@CrossOrigin(
        origins = {
                "http://127.0.0.1:5500",
                "http://localhost:5500"
        }
)
public class FileUploadController {

    private final String UPLOAD_DIR = "uploads/";

    @PostMapping
    public ResponseEntity<String> uploadImage(
            @RequestParam("image") MultipartFile file) {

        try {

            // Check image
            if (file == null || file.isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Please select an image.");
            }

            // Create uploads folder
            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {

                Files.createDirectories(uploadPath);
            }

            // Get original filename
            String fileName =
                    file.getOriginalFilename();

            if (fileName == null || fileName.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body("Invalid image filename.");
            }

            // Save file
            Path filePath =
                    uploadPath.resolve(fileName);

            Files.write(
                    filePath,
                    file.getBytes()
            );

            System.out.println(
                    "Image uploaded successfully: "
                            + fileName
            );

            return ResponseEntity.ok(fileName);

        } catch (IOException e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body("Image upload failed.");
        }
    }
}