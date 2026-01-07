import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:google_mlkit_text_recognition/google_mlkit_text_recognition.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const KycApp());
}

class KycApp extends StatelessWidget {
  const KycApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'KYC Verification',
      theme: ThemeData(
        scaffoldBackgroundColor: Colors.white,
        primaryColor: Colors.grey[800],
      ),
      home: const KycScreen(),
    );
  }
}

class KycScreen extends StatefulWidget {
  const KycScreen({super.key});

  @override
  State<KycScreen> createState() => _KycScreenState();
}

class _KycScreenState extends State<KycScreen> {
  File? idImage;
  File? selfieImage;
  String extractedText = '';
  String detectedIdType = 'Unknown';
  bool loading = false;

  final picker = ImagePicker();
  final textRecognizer =
      TextRecognizer(script: TextRecognitionScript.latin);

  // ---------------- IMAGE PICKERS ----------------

  Future<void> pickIdImage(ImageSource source) async {
    final image = await picker.pickImage(
      source: source,
      imageQuality: 85,
    );
    if (image == null) return;

    setState(() {
      idImage = File(image.path);
      loading = true;
    });

    await extractText(idImage!);
  }

  Future<void> captureSelfie() async {
    final image = await picker.pickImage(
      source: ImageSource.camera,
      preferredCameraDevice: CameraDevice.front,
      imageQuality: 85,
    );
    if (image == null) return;

    setState(() {
      selfieImage = File(image.path);
    });
  }

  // ---------------- OCR ----------------

  Future<void> extractText(File image) async {
    final inputImage = InputImage.fromFile(image);
    final result = await textRecognizer.processImage(inputImage);

    extractedText = result.text;
    detectedIdType = detectIdType(extractedText);

    setState(() {
      loading = false;
    });
  }

  // ---------------- ID TYPE DETECTION ----------------

  String detectIdType(String text) {
    final lower = text.toLowerCase();

    if (lower.contains("national identification number") ||
        lower.contains("nin")) {
      return "NIN Slip";
    }
    if (lower.contains("passport") ||
        lower.contains("federal republic of nigeria")) {
      return "International Passport";
    }
    if (lower.contains("driver") || lower.contains("frsc")) {
      return "Driver's License";
    }
    if (lower.contains("voter")) {
      return "Voter's Card";
    }
    return "Unknown ID";
  }

  // ---------------- API SUBMISSION ----------------

  Future<void> submitKyc() async {
    if (idImage == null || selfieImage == null) {
      showMessage("Please upload ID and selfie");
      return;
    }

    setState(() => loading = true);

    final request =
        http.MultipartRequest('POST', Uri.parse(
            "https://your-backend.com/api/kyc/submit"));

    request.fields['id_type'] = detectedIdType;
    request.fields['raw_text'] = extractedText;

    request.files.add(await http.MultipartFile.fromPath(
        'id_image', idImage!.path));
    request.files.add(await http.MultipartFile.fromPath(
        'selfie', selfieImage!.path));

    try {
      final response = await request.send();
      if (response.statusCode == 200) {
        showMessage("KYC submitted successfully");
      } else {
        showMessage("Submission failed");
      }
    } catch (e) {
      showMessage("Network error");
    }

    setState(() => loading = false);
  }

  void showMessage(String msg) {
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(msg)));
  }

  @override
  void dispose() {
    textRecognizer.close();
    super.dispose();
  }

  // ---------------- UI ----------------

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("KYC Verification"),
        backgroundColor: Colors.grey[200],
        foregroundColor: Colors.black,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            sectionTitle("Upload ID"),
            uploadBox(
              image: idImage,
              label: "Gallery",
              onTap: () => pickIdImage(ImageSource.gallery),
            ),
            uploadBox(
              image: null,
              label: "Camera",
              onTap: () => pickIdImage(ImageSource.camera),
            ),
            const SizedBox(height: 16),
            sectionTitle("Capture Live Selfie"),
            uploadBox(
              image: selfieImage,
              label: "Take Selfie",
              onTap: captureSelfie,
            ),
            const SizedBox(height: 16),
            sectionTitle("Detected ID Type"),
            infoBox(detectedIdType),
            const SizedBox(height: 16),
            sectionTitle("Extracted Text"),
            infoBox(
              extractedText.isEmpty
                  ? "No text extracted yet"
                  : extractedText,
            ),
            const SizedBox(height: 24),
            loading
                ? const CircularProgressIndicator()
                : ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.grey[800],
                      padding: const EdgeInsets.symmetric(
                          horizontal: 40, vertical: 14),
                    ),
                    onPressed: submitKyc,
                    child: const Text("Submit KYC"),
                  ),
          ],
        ),
      ),
    );
  }

  Widget sectionTitle(String title) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Text(
        title,
        style: const TextStyle(
            fontWeight: FontWeight.bold, fontSize: 16),
      ),
    );
  }

  Widget uploadBox(
      {File? image, required String label, required VoidCallback onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 140,
        width: double.infinity,
        margin: const EdgeInsets.only(top: 8),
        decoration: BoxDecoration(
          color: Colors.grey[100],
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.grey.shade400),
        ),
        child: image == null
            ? Center(child: Text(label))
            : ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.file(image, fit: BoxFit.cover),
              ),
      ),
    );
  }

  Widget infoBox(String text) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.grey[50],
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Text(text),
    );
  }
}
