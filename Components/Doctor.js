import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";

const doctors = [
  // Coimbatore
  {
    id: "1",
    name: { en: "Dr. John Doe", ta: "டாக்டர் ஜான் டோ" },
    specialty: {
      en: "Veterinary Surgeon",
      ta: "விலங்கு மருத்துவ அறுவை சிகிச்சை நிபுணர்",
    },
    contact: "+91 92345 67890",
    address: {
      en: "123 Animal Care Street, Coimbatore, Tamil Nadu",
      ta: "123 விலங்கு பராமரிப்பு தெரு, கோயம்புத்தூர், தமிழ்நாடு",
    },
    district: "Coimbatore",
  },
  {
    id: "2",
    name: { en: "Dr. Emily Johnson", ta: "டாக்டர் எமிலி ஜான்சன்" },
    specialty: { en: "Animal Nutritionist", ta: "விலங்கு ஊட்டச்சத்து நிபுணர்" },
    contact: "+91 98765 43210",
    address: {
      en: "456 Farm Road, Coimbatore, Tamil Nadu",
      ta: "456 பண்ணை சாலை, கோயம்புத்தூர், தமிழ்நாடு",
    },
    district: "Coimbatore",
  },
  {
    id: "3",
    name: { en: "Dr. Priya Sharma", ta: "டாக்டர் பிரியா சர்மா" },
    specialty: { en: "Animal Behaviorist", ta: "விலங்கு நடத்தை நிபுணர்" },
    contact: "+91 87654 32109",
    address: {
      en: "34 Animal Care Road, Coimbatore, Tamil Nadu",
      ta: "34 விலங்கு பராமரிப்பு சாலை, கோயம்புத்தூர், தமிழ்நாடு",
    },
    district: "Coimbatore",
  },

  // Chennai
  {
    id: "4",
    name: { en: "Dr. Jaya Kumar", ta: "டாக்டர் ஜெயா குமார்" },
    specialty: { en: "Livestock Specialist", ta: "கால்நடை நிபுணர்" },
    contact: "+91 98765 47321",
    address: {
      en: "789 Livestock Lane, Chennai, Tamil Nadu",
      ta: "789 கால்நடை லேன், சென்னை, தமிழ்நாடு",
    },
    district: "Chennai",
  },
  {
    id: "5",
    name: { en: "Dr. Arjun Reddy", ta: "டாக்டர் அர்ஜுன் ரெட்டி" },
    specialty: { en: "Poultry Specialist", ta: "கோழி நிபுணர்" },
    contact: "+91 91234 56789",
    address: {
      en: "12 Poultry Farm Road, Chennai, Tamil Nadu",
      ta: "12 கோழி பண்ணை சாலை, சென்னை, தமிழ்நாடு",
    },
    district: "Chennai",
  },
  {
    id: "6",
    name: { en: "Dr. Kavitha Raj", ta: "டாக்டர் கவிதா ராஜ்" },
    specialty: { en: "Animal Pathologist", ta: "விலங்கு நோயியல் நிபுணர்" },
    contact: "+91 99876 54321",
    address: {
      en: "67 Veterinary Path Street, Chennai, Tamil Nadu",
      ta: "67 கால்நடை நோயியல் தெரு, சென்னை, தமிழ்நாடு",
    },
    district: "Chennai",
  },

  // Madurai
  {
    id: "7",
    name: { en: "Dr. Suresh Kumar", ta: "டாக்டர் சுரேஷ் குமார்" },
    specialty: {
      en: "Veterinary Surgeon",
      ta: "விலங்கு மருத்துவ அறுவை சிகிச்சை நிபுணர்",
    },
    contact: "+91 92345 67890",
    address: {
      en: "123 Animal Care Street, Madurai, Tamil Nadu",
      ta: "123 விலங்கு பராமரிப்பு தெரு, மதுரை, தமிழ்நாடு",
    },
    district: "Madurai",
  },
  {
    id: "8",
    name: { en: "Dr. Meena Ramesh", ta: "டாக்டர் மீனா ரமேஷ்" },
    specialty: { en: "Animal Nutritionist", ta: "விலங்கு ஊட்டச்சத்து நிபுணர்" },
    contact: "+91 98765 43210",
    address: {
      en: "456 Farm Road, Madurai, Tamil Nadu",
      ta: "456 பண்ணை சாலை, மதுரை, தமிழ்நாடு",
    },
    district: "Madurai",
  },
  {
    id: "9",
    name: { en: "Dr. Aravind Kumar", ta: "டாக்டர் அரவிந்த் குமார்" },
    specialty: { en: "Animal Behaviorist", ta: "விலங்கு நடத்தை நிபுணர்" },
    contact: "+91 87654 32109",
    address: {
      en: "34 Animal Care Road, Madurai, Tamil Nadu",
      ta: "34 விலங்கு பராமரிப்பு சாலை, மதுரை, தமிழ்நாடு",
    },
    district: "Madurai",
  },

  // Salem
  {
    id: "10",
    name: { en: "Dr. Ravi Shankar", ta: "டாக்டர் ரவி சங்கர்" },
    specialty: {
      en: "Veterinary Surgeon",
      ta: "விலங்கு மருத்துவ அறுவை சிகிச்சை நிபுணர்",
    },
    contact: "+91 92345 67890",
    address: {
      en: "123 Animal Care Street, Salem, Tamil Nadu",
      ta: "123 விலங்கு பராமரிப்பு தெரு, சேலம், தமிழ்நாடு",
    },
    district: "Salem",
  },
  {
    id: "11",
    name: { en: "Dr. Anjali Menon", ta: "டாக்டர் அஞ்சலி மேனன்" },
    specialty: { en: "Animal Nutritionist", ta: "விலங்கு ஊட்டச்சத்து நிபுணர்" },
    contact: "+91 98765 43210",
    address: {
      en: "456 Farm Road, Salem, Tamil Nadu",
      ta: "456 பண்ணை சாலை, சேலம், தமிழ்நாடு",
    },
    district: "Salem",
  },
  {
    id: "12",
    name: { en: "Dr. Karthik Raja", ta: "டாக்டர் கார்த்திக் ராஜா" },
    specialty: { en: "Animal Behaviorist", ta: "விலங்கு நடத்தை நிபுணர்" },
    contact: "+91 87654 32109",
    address: {
      en: "34 Animal Care Road, Salem, Tamil Nadu",
      ta: "34 விலங்கு பராமரிப்பு சாலை, சேலம், தமிழ்நாடு",
    },
    district: "Salem",
  },

  // Trichy
  {
    id: "13",
    name: { en: "Dr. Ramesh Babu", ta: "டாக்டர் ரமேஷ் பாபு" },
    specialty: {
      en: "Veterinary Surgeon",
      ta: "விலங்கு மருத்துவ அறுவை சிகிச்சை நிபுணர்",
    },
    contact: "+91 92345 67890",
    address: {
      en: "123 Animal Care Street, Trichy, Tamil Nadu",
      ta: "123 விலங்கு பராமரிப்பு தெரு, திருச்சி, தமிழ்நாடு",
    },
    district: "Trichy",
  },
  {
    id: "14",
    name: { en: "Dr. Sneha Iyer", ta: "டாக்டர் ஸ்நேகா ஐயர்" },
    specialty: { en: "Animal Nutritionist", ta: "விலங்கு ஊட்டச்சத்து நிபுணர்" },
    contact: "+91 98765 43210",
    address: {
      en: "456 Farm Road, Trichy, Tamil Nadu",
      ta: "456 பண்ணை சாலை, திருச்சி, தமிழ்நாடு",
    },
    district: "Trichy",
  },
  {
    id: "15",
    name: { en: "Dr. Kiran Kumar", ta: "டாக்டர் கிரண் குமார்" },
    specialty: { en: "Animal Behaviorist", ta: "விலங்கு நடத்தை நிபுணர்" },
    contact: "+91 87654 32109",
    address: {
      en: "34 Animal Care Road, Trichy, Tamil Nadu",
      ta: "34 விலங்கு பராமரிப்பு சாலை, திருச்சி, தமிழ்நாடு",
    },
    district: "Trichy",
  },

  // Erode
  {
    id: "16",
    name: { en: "Dr. Rajesh Kumar", ta: "டாக்டர் ராஜேஷ் குமார்" },
    specialty: {
      en: "Veterinary Surgeon",
      ta: "விலங்கு மருத்துவ அறுவை சிகிச்சை நிபுணர்",
    },
    contact: "+91 92345 67890",
    address: {
      en: "123 Animal Care Street, Erode, Tamil Nadu",
      ta: "123 விலங்கு பராமரிப்பு தெரு, ஈரோடு, தமிழ்நாடு",
    },
    district: "Erode",
  },
  {
    id: "17",
    name: { en: "Dr. Divya Sharma", ta: "டாக்டர் திவ்யா சர்மா" },
    specialty: { en: "Animal Nutritionist", ta: "விலங்கு ஊட்டச்சத்து நிபுணர்" },
    contact: "+91 98765 43210",
    address: {
      en: "456 Farm Road, Erode, Tamil Nadu",
      ta: "456 பண்ணை சாலை, ஈரோடு, தமிழ்நாடு",
    },
    district: "Erode",
  },
  {
    id: "18",
    name: { en: "Dr. Mohan Raj", ta: "டாக்டர் மோகன் ராஜ்" },
    specialty: { en: "Animal Behaviorist", ta: "விலங்கு நடத்தை நிபுணர்" },
    contact: "+91 87654 32109",
    address: {
      en: "34 Animal Care Road, Erode, Tamil Nadu",
      ta: "34 விலங்கு பராமரிப்பு சாலை, ஈரோடு, தமிழ்நாடு",
    },
    district: "Erode",
  },

  // Tirunelveli
  {
    id: "19",
    name: { en: "Dr. Ganesh Iyer", ta: "டாக்டர் கணேஷ் ஐயர்" },
    specialty: {
      en: "Veterinary Surgeon",
      ta: "விலங்கு மருத்துவ அறுவை சிகிச்சை நிபுணர்",
    },
    contact: "+91 92345 67890",
    address: {
      en: "123 Animal Care Street, Tirunelveli, Tamil Nadu",
      ta: "123 விலங்கு பராமரிப்பு தெரு, திருநெல்வேலி, தமிழ்நாடு",
    },
    district: "Tirunelveli",
  },
  {
    id: "20",
    name: { en: "Dr. Sandhya Ramesh", ta: "டாக்டர் சந்தியா ரமேஷ்" },
    specialty: { en: "Animal Nutritionist", ta: "விலங்கு ஊட்டச்சத்து நிபுணர்" },
    contact: "+91 98765 43210",
    address: {
      en: "456 Farm Road, Tirunelveli, Tamil Nadu",
      ta: "456 பண்ணை சாலை, திருநெல்வேலி, தமிழ்நாடு",
    },
    district: "Tirunelveli",
  },
  {
    id: "21",
    name: { en: "Dr. Naveen Kumar", ta: "டாக்டர் நவீன் குமார்" },
    specialty: { en: "Animal Behaviorist", ta: "விலங்கு நடத்தை நிபுணர்" },
    contact: "+91 87654 32109",
    address: {
      en: "34 Animal Care Road, Tirunelveli, Tamil Nadu",
      ta: "34 விலங்கு பராமரிப்பு சாலை, திருநெல்வேலி, தமிழ்நாடு",
    },
    district: "Tirunelveli",
  },

  // Vellore
  {
    id: "22",
    name: { en: "Dr. Karthik Iyer", ta: "டாக்டர் கார்த்திக் ஐயர்" },
    specialty: {
      en: "Veterinary Surgeon",
      ta: "விலங்கு மருத்துவ அறுவை சிகிச்சை நிபுணர்",
    },
    contact: "+91 92345 67890",
    address: {
      en: "123 Animal Care Street, Vellore, Tamil Nadu",
      ta: "123 விலங்கு பராமரிப்பு தெரு, வேலூர், தமிழ்நாடு",
    },
    district: "Vellore",
  },
  {
    id: "23",
    name: { en: "Dr. Anitha Reddy", ta: "டாக்டர் அனிதா ரெட்டி" },
    specialty: { en: "Animal Nutritionist", ta: "விலங்கு ஊட்டச்சத்து நிபுணர்" },
    contact: "+91 98765 43210",
    address: {
      en: "456 Farm Road, Vellore, Tamil Nadu",
      ta: "456 பண்ணை சாலை, வேலூர், தமிழ்நாடு",
    },
    district: "Vellore",
  },
  {
    id: "24",
    name: { en: "Dr. Vishnu Raj", ta: "டாக்டர் விஷ்ணு ராஜ்" },
    specialty: { en: "Animal Behaviorist", ta: "விலங்கு நடத்தை நிபுணர்" },
    contact: "+91 87654 32109",
    address: {
      en: "34 Animal Care Road, Vellore, Tamil Nadu",
      ta: "34 விலங்கு பராமரிப்பு சாலை, வேலூர், தமிழ்நாடு",
    },
    district: "Vellore",
  },

  // Thanjavur
  {
    id: "25",
    name: { en: "Dr. Raj Kumar", ta: "டாக்டர் ராஜ் குமார்" },
    specialty: {
      en: "Veterinary Surgeon",
      ta: "விலங்கு மருத்துவ அறுவை சிகிச்சை நிபுணர்",
    },
    contact: "+91 92345 67890",
    address: {
      en: "123 Animal Care Street, Thanjavur, Tamil Nadu",
      ta: "123 விலங்கு பராமரிப்பு தெரு, தஞ்சாவூர், தமிழ்நாடு",
    },
    district: "Thanjavur",
  },
  {
    id: "26",
    name: { en: "Dr. Sneha Ramesh", ta: "டாக்டர் ஸ்நேகா ரமேஷ்" },
    specialty: { en: "Animal Nutritionist", ta: "விலங்கு ஊட்டச்சத்து நிபுணர்" },
    contact: "+91 98765 43210",
    address: {
      en: "456 Farm Road, Thanjavur, Tamil Nadu",
      ta: "456 பண்ணை சாலை, தஞ்சாவூர், தமிழ்நாடு",
    },
    district: "Thanjavur",
  },
  {
    id: "27",
    name: { en: "Dr. Arjun Kumar", ta: "டாக்டர் அர்ஜுன் குமார்" },
    specialty: { en: "Animal Behaviorist", ta: "விலங்கு நடத்தை நிபுணர்" },
    contact: "+91 87654 32109",
    address: {
      en: "34 Animal Care Road, Thanjavur, Tamil Nadu",
      ta: "34 விலங்கு பராமரிப்பு சாலை, தஞ்சாவூர், தமிழ்நாடு",
    },
    district: "Thanjavur",
  },

  // Kanchipuram
  {
    id: "28",
    name: { en: "Dr. Nithya Raj", ta: "டாக்டர் நித்யா ராஜ்" },
    specialty: {
      en: "Veterinary Surgeon",
      ta: "விலங்கு மருத்துவ அறுவை சிகிச்சை நிபுணர்",
    },
    contact: "+91 92345 67890",
    address: {
      en: "123 Animal Care Street, Kanchipuram, Tamil Nadu",
      ta: "123 விலங்கு பராமரிப்பு தெரு, காஞ்சிபுரம், தமிழ்நாடு",
    },
    district: "Kanchipuram",
  },
  {
    id: "29",
    name: { en: "Dr. Ramesh Kumar", ta: "டாக்டர் ரமேஷ் குமார்" },
    specialty: { en: "Animal Nutritionist", ta: "விலங்கு ஊட்டச்சத்து நிபுணர்" },
    contact: "+91 98765 43210",
    address: {
      en: "456 Farm Road, Kanchipuram, Tamil Nadu",
      ta: "456 பண்ணை சாலை, காஞ்சிபுரம், தமிழ்நாடு",
    },
    district: "Kanchipuram",
  },
  {
    id: "30",
    name: { en: "Dr. Priya Iyer", ta: "டாக்டர் பிரியா ஐயர்" },
    specialty: { en: "Animal Behaviorist", ta: "விலங்கு நடத்தை நிபுணர்" },
    contact: "+91 87654 32109",
    address: {
      en: "34 Animal Care Road, Kanchipuram, Tamil Nadu",
      ta: "34 விலங்கு பராமரிப்பு சாலை, காஞ்சிபுரம், தமிழ்நாடு",
    },
    district: "Kanchipuram",
  },
];

const Doctor = ({ language }) => {
  const translations = {
    en: {
      title: "Select District",
      subtitle: "Doctors in",
      specialty: "Specialty",
      contact: "Contact",
      address: "Address",
      districts: {
        Coimbatore: "Coimbatore",
        Chennai: "Chennai",
        Madurai: "Madurai",
        Salem: "Salem",
        Trichy: "Trichy",
        Erode: "Erode",
        Tirunelveli: "Tirunelveli",
        Vellore: "Vellore",
        Thanjavur: "Thanjavur",
        Kanchipuram: "Kanchipuram",
      },
    },
    ta: {
      title: "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
      subtitle: "மாவட்டத்தில் உள்ள மருத்துவர்கள் - ",
      specialty: "துறை",
      contact: "தொடர்பு எண்",
      address: "முகவரி",
      districts: {
        Coimbatore: "கோயம்புத்தூர்",
        Chennai: "சென்னை",
        Madurai: "மதுரை",
        Salem: "சேலம்",
        Trichy: "திருச்சி",
        Erode: "ஈரோடு",
        Tirunelveli: "திருநெல்வேலி",
        Vellore: "வேலூர்",
        Thanjavur: "தஞ்சாவூர்",
        Kanchipuram: "காஞ்சிபுரம்",
      },
    },
  };

  const currentTranslations = translations[language] || translations.en;

  const [selectedDistrict, setSelectedDistrict] = useState("Coimbatore");

  const filteredDoctors = doctors.filter(
    (doctor) => doctor.district === selectedDistrict
  );

  const renderDoctor = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name[language]}</Text>
      <Text style={styles.specialty}>
        {currentTranslations.specialty}: {item.specialty[language]}
      </Text>
      <Text style={styles.contact}>
        {currentTranslations.contact}: {item.contact}
      </Text>
      <Text style={styles.address}>
        {currentTranslations.address}: {item.address[language]}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{currentTranslations.title}</Text>

      <Picker
        selectedValue={selectedDistrict}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
      >
        {Object.entries(currentTranslations.districts).map(([key, value]) => (
          <Picker.Item key={key} label={value} value={key} />
        ))}
      </Picker>

      <Text style={styles.subtitle}>
        {currentTranslations.subtitle}{" "}
        {currentTranslations.districts[selectedDistrict]}
      </Text>

      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={renderDoctor}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 20,
    textAlign: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 20,
    elevation: 3,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  specialty: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  contact: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: "#555",
  },
});

export default Doctor;
