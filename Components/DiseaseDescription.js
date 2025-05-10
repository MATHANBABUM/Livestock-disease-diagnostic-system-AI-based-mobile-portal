import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const DiseaseDescription = ({ language, navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const translations = {
    en: {
      title: "Disease Description",
      content:
        "This page provides detailed information about various livestock diseases, their symptoms, and prevention methods.",
      noDiseases: "No diseases found.",
      checkTreatment: "Check Treatment",
      searchPlaceholder: "Search for a disease...",
    },
    ta: {
      title: "நோய் விளக்கம்",
      content:
        "இந்த பக்கம் கால்நடைகளின் நோய்கள், அவற்றின் அறிகுறிகள் மற்றும் தடுப்பு முறைகள் பற்றிய விரிவான தகவல்களை வழங்குகிறது.",
      noDiseases: "நோய்கள் எதுவும் கிடைக்கவில்லை.",
      checkTreatment: "சிகிச்சையைச் சரிபார்க்கவும்",
      searchPlaceholder: "நோய்களைத் தேடவும்...",
    },
  };

  const diseases = [
    {
      title:
        language === "en" ? "Foot-and-Mouth Disease" : "கால் மற்றும் வாய் நோய்",
      description:
        language === "en"
          ? "Foot-and-mouth disease (FMD) is a severe, highly contagious viral disease of livestock that has a significant economic impact."
          : "கால் மற்றும் வாய் நோய் (FMD) என்பது மாட்டுப் பண்ணை விலங்குகளில் தீவிரமான, மிகவும் தொற்றுநோயாகும் வைரஸ் நோயாகும்.",
      treatment:
        language === "en"
          ? "Vaccination and strict biosecurity measures are essential to control the spread of FMD."
          : "எஃப்எம்டி பரவலை கட்டுப்படுத்த தடுப்பூசி மற்றும் கடுமையான உயிரணு பாதுகாப்பு நடவடிக்கைகள் அவசியம்.",
      vetDetails: [
        {
          name: "Dr. John Doe",
          contact: "123-456-7890",
          address: "123 Farm Lane, Rural Town",
        },
        {
          name: "Dr. Jane Smith",
          contact: "987-654-3210",
          address: "456 Country Road, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Bovine Tuberculosis" : "பசு காசநோய்",
      description:
        language === "en"
          ? "Bovine tuberculosis is a chronic disease of cattle caused by the bacterium Mycobacterium bovis."
          : "பசு காசநோய் என்பது Mycobacterium bovis என்ற பாக்டீரியாவால் ஏற்படும் பசுக்களின் நீண்டகால நோயாகும்.",
      treatment:
        language === "en"
          ? "Test and slaughter policy, along with good farm management practices, are recommended."
          : "சோதனை மற்றும் கொலை கொள்கை மற்றும் நல்ல பண்ணை மேலாண்மை நடைமுறைகள் பரிந்துரைக்கப்படுகின்றன.",
      vetDetails: [
        {
          name: "Dr. Emily Brown",
          contact: "555-123-4567",
          address: "789 Farm Road, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Mastitis" : "மாஸ்டிடிஸ்",
      description:
        language === "en"
          ? "Mastitis is an inflammation of the mammary gland (udder) in dairy animals, usually caused by bacterial infection. It is one of the most common diseases in dairy cattle."
          : "மாஸ்டிடிஸ் என்பது பால் உற்பத்தி விலங்குகளில் பால் சுரப்பி (உதர்) அழற்சி ஆகும், இது பொதுவாக பாக்டீரியா தொற்றால் ஏற்படுகிறது. இது பால் பசுக்களில் மிகவும் பொதுவான நோய்களில் ஒன்றாகும்.",
      treatment:
        language === "en"
          ? "Antibiotic therapy and proper milking hygiene are essential for treating mastitis."
          : "மாஸ்டிடிஸ் சிகிச்சைக்கு ஆன்டிபயோடிக் சிகிச்சை மற்றும் சரியான பால் பறிப்பு சுகாதாரம் அவசியம்.",
      vetDetails: [
        {
          name: "Dr. Michael Green",
          contact: "321-654-9870",
          address: "101 Dairy Street, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Brucellosis" : "புரூசெல்லோசிஸ்",
      description:
        language === "en"
          ? "Brucellosis is a bacterial infection that affects various animals, including cattle, goats, and sheep. It can be transmitted to humans through contact with infected animals or their products."
          : "புரூசெல்லோசிஸ் என்பது பசுக்கள், ஆடுகள் மற்றும் செம்மறியாடுகள் உட்பட பல்வேறு விலங்குகளை பாதிக்கும் பாக்டீரியா தொற்றாகும். பாதிக்கப்பட்ட விலங்குகள் அல்லது அவற்றின் தயாரிப்புகளுடன் தொடர்பு கொள்ளுவதன் மூலம் இது மனிதர்களுக்கு பரவக்கூடும்.",
      treatment:
        language === "en"
          ? "Antibiotics like doxycycline or rifampin are used to treat human brucellosis. Animal control and vaccination help prevent the spread of the disease."
          : "மனித புரூசெல்லோசிஸ் சிகிச்சைக்கு டாக்ஸிசைக்ளின் அல்லது ரிபாம்பின் போன்ற ஆன்டிபயோடிக்கள் பயன்படுத்தப்படுகின்றன. விலங்கு கட்டுப்பாடு மற்றும் தடுப்பூசி நோயின் பரவலைத் தடுக்க உதவுகின்றன.",
      vetDetails: [
        {
          name: "Dr. Laura Black",
          contact: "789-012-3456",
          address: "303 Veterinary Lane, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Bluetongue" : "நீலநாக்கு",
      description:
        language === "en"
          ? "Bluetongue is a viral disease primarily affecting sheep but can also infect cattle, goats, and other ruminants. It is transmitted by biting midges."
          : "நீலநாக்கு என்பது முதன்மையாக செம்மறியாடுகளை பாதிக்கும் வைரஸ் நோயாகும், ஆனால் இது பசுக்கள், ஆடுகள் மற்றும் பிற மிருகங்களைப் பாதிக்கக்கூடும். இது கடிக்கும் நடுக்கங்கள் மூலம் பரவுகிறது.",
      treatment:
        language === "en"
          ? "There is no specific treatment for bluetongue, but vaccination can help prevent the disease."
          : "நீலநாக்குக்கு சிறப்பு சிகிச்சை எதுவும் இல்லை, ஆனால் தடுப்பூசி நோயைத் தடுக்க உதவுகிறது.",
      vetDetails: [
        {
          name: "Dr. Kevin Brown",
          contact: "456-789-0123",
          address: "404 Sheep Road, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Newcastle Disease" : "நியூகாஸ்டில் நோய்",
      description:
        language === "en"
          ? "Newcastle disease is a highly contagious viral infection that primarily affects birds but can also affect mammals like pigs and humans. It causes severe respiratory and digestive symptoms."
          : "நியூகாஸ்டில் நோய் என்பது முதன்மையாக பறவைகளை பாதிக்கும் மிகவும் தொற்றுநோயான வைரஸ் தொற்றாகும், ஆனால் பன்றிகள் மற்றும் மனிதர்கள் போன்ற பாலூட்டி விலங்குகளைப் பாதிக்கக்கூடும். இது தீவிரமான சுவாச மற்றும் செரிமான அறிகுறிகளை ஏற்படுத்துகிறது.",
      treatment:
        language === "en"
          ? "Vaccination is the most effective prevention measure. Infected animals should be isolated to limit the spread."
          : "தடுப்பூசி என்பது மிகவும் பயனுள்ள தடுப்பு நடவடிக்கையாகும். பாதிக்கப்பட்ட விலங்குகள் பரவலைக் கட்டுப்படுத்த தனிமைப்படுத்தப்பட வேண்டும்.",
      vetDetails: [
        {
          name: "Dr. Anna Blue",
          contact: "123-789-4560",
          address: "505 Bird Street, Rural Town",
        },
      ],
    },
    {
      title:
        language === "en"
          ? "Paratuberculosis (Johne's Disease)"
          : "பாராடியூபர்குலோசிஸ் (ஜோனே நோய்)",
      description:
        language === "en"
          ? "Johne's disease is a chronic, infectious disease of ruminants caused by the bacterium Mycobacterium avium paratuberculosis, affecting the intestines and causing weight loss, diarrhea, and eventually death."
          : "ஜோனே நோய் என்பது மைகோபாக்டீரியம் அவியம் பாராடியூபர்குலோசிஸ் என்ற பாக்டீரியாவால் ஏற்படும் நீண்டகால, தொற்றுநோயாகும், இது குடல்களை பாதித்து எடை இழப்பு, வயிற்றுப்போக்கு மற்றும் இறுதியில் மரணம் ஏற்படுகிறது.",
      treatment:
        language === "en"
          ? "There is no cure, but proper farm management practices and culling infected animals are important for control."
          : "இதற்கு மருந்து எதுவும் இல்லை, ஆனால் சரியான பண்ணை மேலாண்மை நடைமுறைகள் மற்றும் பாதிக்கப்பட்ட விலங்குகளை அழித்தல் கட்டுப்பாட்டிற்கு முக்கியமானவை.",
      vetDetails: [
        {
          name: "Dr. Chris Red",
          contact: "654-987-3210",
          address: "606 Ruminant Road, Rural Town",
        },
      ],
    },
    {
      title:
        language === "en"
          ? "Avian Influenza (Bird Flu)"
          : "பறவை காய்ச்சல் (பறவை காய்ச்சல்)",
      description:
        language === "en"
          ? "Avian influenza is an infectious viral disease that primarily affects poultry, including chickens, ducks, and turkeys. Some strains can infect humans and other animals."
          : "பறவை காய்ச்சல் என்பது கோழிகள், வாத்துகள் மற்றும் வான்கோழிகள் உட்பட முதன்மையாக கோழிகளைப் பாதிக்கும் தொற்றுநோயான வைரஸ் நோயாகும். சில வகைகள் மனிதர்களையும் பிற விலங்குகளையும் பாதிக்கக்கூடும்.",
      treatment:
        language === "en"
          ? "There is no specific treatment for bird flu in poultry, but antiviral medications may be used for humans. Vaccination is an effective preventive measure."
          : "கோழிகளில் பறவை காய்ச்சலுக்கு சிறப்பு சிகிச்சை எதுவும் இல்லை, ஆனால் மனிதர்களுக்கு வைரஸ் எதிர்ப்பு மருந்துகள் பயன்படுத்தப்படலாம். தடுப்பூசி ஒரு பயனுள்ள தடுப்பு நடவடிக்கையாகும்.",
      vetDetails: [
        {
          name: "Dr. Lisa Green",
          contact: "789-654-1230",
          address: "707 Poultry Lane, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Lumpy Skin Disease" : "கட்டியான தோல் நோய்",
      description:
        language === "en"
          ? "Lumpy skin disease is a viral disease affecting cattle, causing fever, swelling of the skin, and lesions. It can lead to significant economic losses in affected herds."
          : "கட்டியான தோல் நோய் என்பது பசுக்களை பாதிக்கும் வைரஸ் நோயாகும், இது காய்ச்சல், தோல் வீக்கம் மற்றும் காயங்களை ஏற்படுத்துகிறது. பாதிக்கப்பட்ட மந்தைகளில் இது முக்கியமான பொருளாதார இழப்புகளை ஏற்படுத்தும்.",
      treatment:
        language === "en"
          ? "There is no specific treatment, but supportive care and vaccination are used to prevent further outbreaks."
          : "இதற்கு சிறப்பு சிகிச்சை எதுவும் இல்லை, ஆனால் ஆதரவு பராமரிப்பு மற்றும் தடுப்பூசி மேலும் பரவலைத் தடுக்க பயன்படுத்தப்படுகின்றன.",
      vetDetails: [
        {
          name: "Dr. Mark Yellow",
          contact: "321-987-6540",
          address: "808 Cattle Road, Rural Town",
        },
      ],
    },
    {
      title:
        language === "en"
          ? "African Swine Fever"
          : "ஆப்பிரிக்க பன்றி காய்ச்சல்",
      description:
        language === "en"
          ? "African swine fever is a deadly viral disease affecting domestic and wild pigs. It causes hemorrhagic fever and often results in high mortality rates."
          : "ஆப்பிரிக்க பன்றி காய்ச்சல் என்பது உள்நாட்டு மற்றும் காட்டு பன்றிகளை பாதிக்கும் கொடிய வைரஸ் நோயாகும். இது இரத்தக்கசிவு காய்ச்சலை ஏற்படுத்துகிறது மற்றும் பெரும்பாலும் அதிக மரண விகிதங்களை ஏற்படுத்துகிறது.",
      treatment:
        language === "en"
          ? "There is no vaccine or cure for African swine fever. Control measures include culling affected animals and strict biosecurity measures."
          : "ஆப்பிரிக்க பன்றி காய்ச்சலுக்கு தடுப்பூசி அல்லது மருந்து எதுவும் இல்லை. கட்டுப்பாட்டு நடவடிக்கைகளில் பாதிக்கப்பட்ட விலங்குகளை அழித்தல் மற்றும் கடுமையான உயிரணு பாதுகாப்பு நடவடிக்கைகள் அடங்கும்.",
      vetDetails: [
        {
          name: "Dr. Nancy White",
          contact: "987-321-6540",
          address: "909 Swine Street, Rural Town",
        },
      ],
    },
    {
      title:
        language === "en"
          ? "Contagious Bovine Pleuropneumonia"
          : "தொற்றுநோயான பசு பிளூரோநியூமோனியா",
      description:
        language === "en"
          ? "Contagious bovine pleuropneumonia is a bacterial infection affecting cattle, causing severe pleuropneumonia and respiratory distress. It is highly contagious and can lead to rapid mortality."
          : "தொற்றுநோயான பசு பிளூரோநியூமோனியா என்பது பசுக்களை பாதிக்கும் பாக்டீரியா தொற்றாகும், இது தீவிரமான பிளூரோநியூமோனியா மற்றும் சுவாச சிரமத்தை ஏற்படுத்துகிறது. இது மிகவும் தொற்றுநோயாகும் மற்றும் விரைவான மரணத்தை ஏற்படுத்தும்.",
      treatment:
        language === "en"
          ? "Antibiotics like tetracycline may be used to treat affected cattle. Quarantine and culling of infected animals help control the disease."
          : "பாதிக்கப்பட்ட பசுக்களை சிகிச்சையளிக்க டெட்ராசைக்ளின் போன்ற ஆன்டிபயோடிக்கள் பயன்படுத்தப்படலாம். பாதிக்கப்பட்ட விலங்குகளை தனிமைப்படுத்துதல் மற்றும் அழித்தல் நோயைக் கட்டுப்படுத்த உதவுகின்றன.",
      vetDetails: [
        {
          name: "Dr. Oliver Black",
          contact: "123-654-7890",
          address: "1010 Bovine Blvd, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Scrapie" : "ஸ்கிரேப்பி",
      description:
        language === "en"
          ? "Scrapie is a prion disease affecting sheep and goats, causing degeneration of the brain. It is a chronic, progressive disease that leads to death."
          : "ஸ்கிரேப்பி என்பது செம்மறியாடுகள் மற்றும் ஆடுகளை பாதிக்கும் பிரியான் நோயாகும், இது மூளையின் சிதைவைக் காரணமாகக் கொண்டது. இது மரணத்தை ஏற்படுத்தும் நீண்டகால, முன்னேற்றமான நோயாகும்.",
      treatment:
        language === "en"
          ? "There is no treatment for scrapie. Affected animals are usually culled to prevent the spread of the disease."
          : "ஸ்கிரேப்பிக்கு சிகிச்சை எதுவும் இல்லை. பாதிக்கப்பட்ட விலங்குகள் பொதுவாக நோயின் பரவலைத் தடுக்க அழிக்கப்படுகின்றன.",
      vetDetails: [
        {
          name: "Dr. Peter Green",
          contact: "456-123-7890",
          address: "1111 Sheep Lane, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Toxoplasmosis" : "டோக்ஸோபிளாஸ்மோசிஸ்",
      description:
        language === "en"
          ? "Toxoplasmosis is a parasitic disease caused by Toxoplasma gondii, which can affect sheep, goats, and other livestock. It is primarily transmitted through contact with contaminated feed or water."
          : "டோக்ஸோபிளாஸ்மோசிஸ் என்பது டோக்ஸோபிளாஸ்மா காண்டி என்ற பராசிட்டிக் நோயாகும், இது செம்மறியாடுகள், ஆடுகள் மற்றும் பிற மாட்டுப் பண்ணை விலங்குகளை பாதிக்கக்கூடும். இது முதன்மையாக மாசுபட்ட தீவனம் அல்லது நீருடன் தொடர்பு கொள்ளுவதன் மூலம் பரவுகிறது.",
      treatment:
        language === "en"
          ? "Antibiotics like pyrimethamine and sulfonamides are used for treating toxoplasmosis in animals. Proper hygiene and control measures help reduce the risk."
          : "விலங்குகளில் டோக்ஸோபிளாஸ்மோசிஸ் சிகிச்சைக்கு பைரிமெதமின் மற்றும் சல்போனமைட்ஸ் போன்ற ஆன்டிபயோடிக்கள் பயன்படுத்தப்படுகின்றன. சரியான சுகாதாரம் மற்றும் கட்டுப்பாட்டு நடவடிக்கைகள் ஆபத்தை குறைக்க உதவுகின்றன.",
      vetDetails: [
        {
          name: "Dr. Quentin Blue",
          contact: "789-321-6540",
          address: "1212 Livestock Road, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Theileriosis" : "தெய்லீரியோசிஸ்",
      description:
        language === "en"
          ? "Theileriosis is a disease caused by protozoan parasites of the genus Theileria. It affects cattle and is transmitted by ticks."
          : "தெய்லீரியோசிஸ் என்பது தெய்லீரியா இனத்தைச் சேர்ந்த புரோட்டோசோவான் பராசிட்டுகளால் ஏற்படும் நோயாகும். இது பசுக்களை பாதிக்கிறது மற்றும் டிக்ஸ் மூலம் பரவுகிறது.",
      treatment:
        language === "en"
          ? "Antiprotozoal drugs like buparvaquone are used to treat the disease, and tick control is crucial for prevention."
          : "பியூபர்வாகுவோன் போன்ற புரோட்டோசோவால் எதிர்ப்பு மருந்துகள் நோயை சிகிச்சையளிக்க பயன்படுத்தப்படுகின்றன மற்றும் டிக் கட்டுப்பாடு தடுப்பதற்கு முக்கியமானது.",
      vetDetails: [
        {
          name: "Dr. Rachel Red",
          contact: "321-456-7890",
          address: "1313 Tick Lane, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Blue Tongue" : "நீலநாக்கு",
      description:
        language === "en"
          ? "Blue tongue is a viral disease transmitted by midges and affects primarily sheep, cattle, and goats. It causes swelling, ulcers, and severe inflammation."
          : "நீலநாக்கு என்பது நடுக்கங்கள் மூலம் பரவும் வைரஸ் நோயாகும் மற்றும் முதன்மையாக செம்மறியாடுகள், பசுக்கள் மற்றும் ஆடுகளை பாதிக்கிறது. இது வீக்கம், புண்கள் மற்றும் தீவிர அழற்சியை ஏற்படுத்துகிறது.",
      treatment:
        language === "en"
          ? "There is no treatment, but vaccination and vector control can prevent the spread of the disease."
          : "இதற்கு சிகிச்சை எதுவும் இல்லை, ஆனால் தடுப்பூசி மற்றும் வெக்டர் கட்டுப்பாடு நோயின் பரவலைத் தடுக்க முடியும்.",
      vetDetails: [
        {
          name: "Dr. Steven Yellow",
          contact: "654-123-9870",
          address: "1414 Midge Street, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Tick-borne Fever" : "டிக்-போர்ன் காய்ச்சல்",
      description:
        language === "en"
          ? "Tick-borne fever is caused by bacteria transmitted through tick bites. It primarily affects cattle and can result in fever, lameness, and reduced productivity."
          : "டிக்-போர்ன் காய்ச்சல் என்பது டிக் கடியால் பரவும் பாக்டீரியாவால் ஏற்படுகிறது. இது முதன்மையாக பசுக்களை பாதிக்கிறது மற்றும் காய்ச்சல், குண்டு மற்றும் உற்பத்தித்திறன் குறைதல் ஆகியவற்றை ஏற்படுத்தும்.",
      treatment:
        language === "en"
          ? "Antibiotics like oxytetracycline are used to treat tick-borne fever in cattle."
          : "பசுக்களில் டிக்-போர்ன் காய்ச்சலை சிகிச்சையளிக்க ஆக்ஸிடெட்ராசைக்ளின் போன்ற ஆன்டிபயோடிக்கள் பயன்படுத்தப்படுகின்றன.",
      vetDetails: [
        {
          name: "Dr. Thomas White",
          contact: "987-654-3210",
          address: "1515 Tick Blvd, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Anthrax" : "ஆந்த்ராக்ஸ்",
      description:
        language === "en"
          ? "Anthrax is a bacterial infection caused by Bacillus anthracis. It can affect both animals and humans, typically through contact with contaminated animal products."
          : "ஆந்த்ராக்ஸ் என்பது பாசில்லஸ் ஆந்த்ராசிஸ் என்ற பாக்டீரியா தொற்றால் ஏற்படும் பாக்டீரியா தொற்றாகும். இது மாசுபட்ட விலங்கு தயாரிப்புகளுடன் தொடர்பு கொள்ளுவதன் மூலம் விலங்குகள் மற்றும் மனிதர்களை பாதிக்கக்கூடும்.",
      treatment:
        language === "en"
          ? "Treatment involves antibiotics such as penicillin. Infected animals should be isolated, and vaccination can prevent the disease."
          : "சிகிச்சையில் பெனிசிலின் போன்ற ஆன்டிபயோடிக்கள் அடங்கும். பாதிக்கப்பட்ட விலங்குகள் தனிமைப்படுத்தப்பட வேண்டும் மற்றும் தடுப்பூசி நோயைத் தடுக்க முடியும்.",
      vetDetails: [
        {
          name: "Dr. Ursula Black",
          contact: "123-789-6540",
          address: "1616 Anthrax Road, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Leptospirosis" : "லெப்டோஸ்பைரோசிஸ்",
      description:
        language === "en"
          ? "Leptospirosis is a bacterial disease that can affect both humans and animals, causing symptoms like fever, jaundice, and liver or kidney failure."
          : "லெப்டோஸ்பைரோசிஸ் என்பது மனிதர்களையும் விலங்குகளையும் பாதிக்கக்கூடிய பாக்டீரியா நோயாகும், இது காய்ச்சல், மஞ்சள் காமாலை மற்றும் கல்லீரல் அல்லது சிறுநீரக செயலிழப்பு போன்ற அறிகுறிகளை ஏற்படுத்துகிறது.",
      treatment:
        language === "en"
          ? "Antibiotics such as doxycycline or penicillin are used to treat leptospirosis. Vaccination is available for livestock."
          : "லெப்டோஸ்பைரோசிஸ் சிகிச்சைக்கு டாக்ஸிசைக்ளின் அல்லது பெனிசிலின் போன்ற ஆன்டிபயோடிக்கள் பயன்படுத்தப்படுகின்றன. மாட்டுப் பண்ணை விலங்குகளுக்கு தடுப்பூசி கிடைக்கிறது.",
      vetDetails: [
        {
          name: "Dr. Victor Green",
          contact: "456-789-3210",
          address: "1717 Lepto Lane, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Pseudorabies" : "பசூடோரேபிஸ்",
      description:
        language === "en"
          ? "Pseudorabies is a viral disease primarily affecting pigs but can also infect other mammals. It causes neurological symptoms and can lead to high mortality rates in young animals."
          : "பசூடோரேபிஸ் என்பது முதன்மையாக பன்றிகளை பாதிக்கும் வைரஸ் நோயாகும், ஆனால் இது பிற பாலூட்டி விலங்குகளைப் பாதிக்கக்கூடும். இது நரம்பியல் அறிகுறிகளை ஏற்படுத்துகிறது மற்றும் இளம் விலங்குகளில் அதிக மரண விகிதங்களை ஏற்படுத்தும்.",
      treatment:
        language === "en"
          ? "There is no specific treatment, but vaccination helps prevent outbreaks."
          : "இதற்கு சிறப்பு சிகிச்சை எதுவும் இல்லை, ஆனால் தடுப்பூசி பரவலைத் தடுக்க உதவுகிறது.",
      vetDetails: [
        {
          name: "Dr. Wendy Blue",
          contact: "789-654-9870",
          address: "1818 Pig Street, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Swine Influenza" : "பன்றி காய்ச்சல்",
      description:
        language === "en"
          ? "Swine influenza is a respiratory disease in pigs caused by the H1N1 influenza virus. It can be transmitted to humans and other animals."
          : "பன்றி காய்ச்சல் என்பது H1N1 காய்ச்சல் வைரஸால் ஏற்படும் பன்றிகளில் சுவாச நோயாகும். இது மனிதர்களுக்கும் பிற விலங்குகளுக்கும் பரவக்கூடும்.",
      treatment:
        language === "en"
          ? "Vaccination and antiviral drugs may be used for both pigs and humans. Symptomatic treatment is also provided."
          : "பன்றிகளுக்கும் மனிதர்களுக்கும் தடுப்பூசி மற்றும் வைரஸ் எதிர்ப்பு மருந்துகள் பயன்படுத்தப்படலாம். அறிகுறி சிகிச்சையும் வழங்கப்படுகிறது.",
      vetDetails: [
        {
          name: "Dr. Xavier Red",
          contact: "321-987-1230",
          address: "1919 Swine Blvd, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Rinderpest" : "ரிண்டர்பெஸ்ட்",
      description:
        language === "en"
          ? "Rinderpest is a viral disease of cattle, buffalo, and other ruminants. It causes fever, diarrhea, and high mortality rates."
          : "ரிண்டர்பெஸ்ட் என்பது பசுக்கள், எருமைகள் மற்றும் பிற மிருகங்களின் வைரஸ் நோயாகும். இது காய்ச்சல், வயிற்றுப்போக்கு மற்றும் அதிக மரண விகிதங்களை ஏற்படுத்துகிறது.",
      treatment:
        language === "en"
          ? "There is no specific treatment, but vaccination has led to the global eradication of the disease."
          : "இதற்கு சிறப்பு சிகிச்சை எதுவும் இல்லை, ஆனால் தடுப்பூசி நோயின் உலகளாவிய ஒழிப்பிற்கு வழிவகுத்தது.",
      vetDetails: [
        {
          name: "Dr. Yvonne Yellow",
          contact: "654-321-9870",
          address: "2020 Rinderpest Road, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Equine Influenza" : "குதிரை காய்ச்சல்",
      description:
        language === "en"
          ? "Equine influenza is a contagious respiratory disease in horses caused by influenza viruses."
          : "குதிரை காய்ச்சல் என்பது காய்ச்சல் வைரஸால் ஏற்படும் தொற்றுநோயான சுவாச நோயாகும்.",
      treatment:
        language === "en"
          ? "Vaccination and supportive care are used to treat equine influenza."
          : "குதிரை காய்ச்சலை சிகிச்சையளிக்க தடுப்பூசி மற்றும் ஆதரவு பராமரிப்பு பயன்படுத்தப்படுகின்றன.",
      vetDetails: [
        {
          name: "Dr. Zachary White",
          contact: "987-123-4560",
          address: "2121 Horse Lane, Rural Town",
        },
      ],
    },
    {
      title:
        language === "en"
          ? "Equine Infectious Anemia"
          : "குதிரை தொற்றுநோயான அனீமியா",
      description:
        language === "en"
          ? "Equine infectious anemia is a viral disease that affects horses, leading to anemia, fever, and weight loss."
          : "குதிரை தொற்றுநோயான அனீமியா என்பது குதிரைகளை பாதிக்கும் வைரஸ் நோயாகும், இது அனீமியா, காய்ச்சல் மற்றும் எடை இழப்பிற்கு வழிவகுக்கிறது.",
      treatment:
        language === "en"
          ? "There is no cure, but infected horses should be quarantined to prevent the spread of the virus."
          : "இதற்கு மருந்து எதுவும் இல்லை, ஆனால் பாதிக்கப்பட்ட குதிரைகள் வைரஸின் பரவலைத் தடுக்க தனிமைப்படுத்தப்பட வேண்டும்.",
      vetDetails: [
        {
          name: "Dr. Alice Black",
          contact: "123-456-7890",
          address: "2222 EIA Road, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Fowl Pox" : "பறவை பாக்ஸ்",
      description:
        language === "en"
          ? "Fowl pox is a viral disease affecting poultry, causing lesions on the skin and mucous membranes."
          : "பறவை பாக்ஸ் என்பது கோழிகளை பாதிக்கும் வைரஸ் நோயாகும், இது தோல் மற்றும் நீர்க்கோஷங்கள் மீது காயங்களை ஏற்படுத்துகிறது.",
      treatment:
        language === "en"
          ? "There is no treatment, but vaccination is effective in preventing the disease."
          : "இதற்கு சிகிச்சை எதுவும் இல்லை, ஆனால் தடுப்பூசி நோயைத் தடுக்க பயனுள்ளதாகும்.",
      vetDetails: [
        {
          name: "Dr. Bob Green",
          contact: "456-789-0123",
          address: "2323 Poultry Lane, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Marek's Disease" : "மாரெக் நோய்",
      description:
        language === "en"
          ? "Marek's disease is a viral disease of poultry that causes tumors, paralysis, and immunosuppression."
          : "மாரெக் நோய் என்பது கோழிகளின் வைரஸ் நோயாகும், இது கட்டிகள், பக்கவாதம் மற்றும் நோய் எதிர்ப்பு சக்தி குறைதல் ஆகியவற்றை ஏற்படுத்துகிறது.",
      treatment:
        language === "en"
          ? "Vaccination at a young age is the best prevention for this disease."
          : "இளம் வயதில் தடுப்பூசி போடுவது இந்த நோய்க்கான சிறந்த தடுப்பு.",
      vetDetails: [
        {
          name: "Dr. Carol Blue",
          contact: "789-012-3456",
          address: "2424 Marek Street, Rural Town",
        },
      ],
    },
    {
      title:
        language === "en"
          ? "Chronic Wasting Disease"
          : "நீண்டகால வீணாக்கும் நோய்",
      description:
        language === "en"
          ? "Chronic wasting disease affects deer, elk, and moose, causing weight loss, behavioral changes, and death. It is caused by prions."
          : "நீண்டகால வீணாக்கும் நோய் மான், எல்க் மற்றும் மூஸ் ஆகியவற்றை பாதிக்கிறது, இது எடை இழப்பு, நடத்தை மாற்றங்கள் மற்றும் மரணத்தை ஏற்படுத்துகிறது. இது பிரியான்களால் ஏற்படுகிறது.",
      treatment:
        language === "en"
          ? "There is no cure, and infected animals are often culled to prevent spread."
          : "இதற்கு மருந்து எதுவும் இல்லை, மேலும் பாதிக்கப்பட்ட விலங்குகள் பரவலைத் தடுக்க அடிக்கடி அழிக்கப்படுகின்றன.",
      vetDetails: [
        {
          name: "Dr. David Red",
          contact: "321-654-9870",
          address: "2525 CWD Road, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Hog Cholera" : "பன்றி காசநோய்",
      description:
        language === "en"
          ? "Hog cholera is a viral disease in pigs that causes fever, lethargy, and bleeding."
          : "பன்றி காசநோய் என்பது பன்றிகளில் காய்ச்சல், சோம்பல் மற்றும் இரத்தக்கசிவு ஏற்படுத்தும் வைரஸ் நோயாகும்.",
      treatment:
        language === "en"
          ? "There is no treatment, but vaccination programs can help prevent outbreaks."
          : "இதற்கு சிகிச்சை எதுவும் இல்லை, ஆனால் தடுப்பூசி திட்டங்கள் பரவலைத் தடுக்க உதவுகின்றன.",
      vetDetails: [
        {
          name: "Dr. Eve Yellow",
          contact: "654-987-3210",
          address: "2626 Hog Lane, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Bluetongue" : "நீலநாக்கு",
      description:
        language === "en"
          ? "Bluetongue is a viral disease transmitted by biting midges, affecting sheep and other ruminants."
          : "நீலநாக்கு என்பது கடிக்கும் நடுக்கங்கள் மூலம் பரவும் வைரஸ் நோயாகும், இது செம்மறியாடுகள் மற்றும் பிற மிருகங்களை பாதிக்கிறது.",
      treatment:
        language === "en"
          ? "There is no specific treatment, but vaccination and vector control are important for disease prevention."
          : "இதற்கு சிறப்பு சிகிச்சை எதுவும் இல்லை, ஆனால் தடுப்பூசி மற்றும் வெக்டர் கட்டுப்பாடு நோய் தடுப்பதற்கு முக்கியமானவை.",
      vetDetails: [
        {
          name: "Dr. Frank White",
          contact: "987-321-6540",
          address: "2727 Midge Blvd, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Hendra Virus" : "ஹென்றா வைரஸ்",
      description:
        language === "en"
          ? "Hendra virus is a viral infection primarily affecting horses and can be transmitted to humans. It can cause respiratory and neurological symptoms."
          : "ஹென்றா வைரஸ் என்பது முதன்மையாக குதிரைகளை பாதிக்கும் வைரஸ் தொற்றாகும் மற்றும் மனிதர்களுக்கு பரவக்கூடும். இது சுவாச மற்றும் நரம்பியல் அறிகுறிகளை ஏற்படுத்தும்.",
      treatment:
        language === "en"
          ? "There is no treatment, but vaccination for horses is available."
          : "இதற்கு சிகிச்சை எதுவும் இல்லை, ஆனால் குதிரைகளுக்கு தடுப்பூசி கிடைக்கிறது.",
      vetDetails: [
        {
          name: "Dr. Grace Black",
          contact: "123-789-4560",
          address: "2828 Hendra Road, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Glanders" : "கிளாண்டர்ஸ்",
      description:
        language === "en"
          ? "Glanders is a bacterial disease of horses, mules, and donkeys that can be transmitted to humans."
          : "கிளாண்டர்ஸ் என்பது குதிரைகள், கழுதைகள் மற்றும் கழுதைகளின் பாக்டீரியா நோயாகும், இது மனிதர்களுக்கு பரவக்கூடும்.",
      treatment:
        language === "en"
          ? "Antibiotics such as streptomycin are used, and infected animals should be culled."
          : "ஸ்டிரெப்டோமைசின் போன்ற ஆன்டிபயோடிக்கள் பயன்படுத்தப்படுகின்றன மற்றும் பாதிக்கப்பட்ட விலங்குகள் அழிக்கப்பட வேண்டும்.",
      vetDetails: [
        {
          name: "Dr. Henry Green",
          contact: "456-123-7890",
          address: "2929 Glanders Lane, Rural Town",
        },
      ],
    },
    {
      title:
        language === "en"
          ? "Bovine Respiratory Disease Complex"
          : "பசு சுவாச நோய் சிக்கலானது",
      description:
        language === "en"
          ? "Bovine respiratory disease complex (BRDC) is a combination of infections in cattle, including viral and bacterial agents."
          : "பசு சுவாச நோய் சிக்கலானது (BRDC) என்பது வைரஸ் மற்றும் பாக்டீரியா முகவர்கள் உட்பட பசுக்களில் உள்ள தொற்றுகளின் சேர்க்கையாகும்.",
      treatment:
        language === "en"
          ? "Antibiotics and supportive care are used to treat BRDC."
          : "BRDC சிகிச்சையளிக்க ஆன்டிபயோடிக்கள் மற்றும் ஆதரவு பராமரிப்பு பயன்படுத்தப்படுகின்றன.",
      vetDetails: [
        {
          name: "Dr. Irene Blue",
          contact: "789-654-1230",
          address: "3030 BRDC Road, Rural Town",
        },
      ],
    },
    {
      title:
        language === "en"
          ? "Contagious Caprine Pleuropneumonia"
          : "தொற்றுநோயான கேப்ரின் பிளூரோநியூமோனியா",
      description:
        language === "en"
          ? "This is a bacterial infection affecting goats that causes pleuropneumonia, leading to respiratory distress."
          : "இது ஆடுகளை பாதிக்கும் பாக்டீரியா தொற்றாகும், இது பிளூரோநியூமோனியாவை ஏற்படுத்துகிறது, இது சுவாச சிரமத்திற்கு வழிவகுக்கிறது.",
      treatment:
        language === "en"
          ? "Antibiotics like tetracycline can be used, and isolation of affected animals is necessary."
          : "டெட்ராசைக்ளின் போன்ற ஆன்டிபயோடிக்கள் பயன்படுத்தப்படலாம் மற்றும் பாதிக்கப்பட்ட விலங்குகளை தனிமைப்படுத்துதல் அவசியம்.",
      vetDetails: [
        {
          name: "Dr. Jack Red",
          contact: "321-987-6540",
          address: "3131 Goat Lane, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Coccidiosis" : "கொக்கிடியோசிஸ்",
      description:
        language === "en"
          ? "Coccidiosis is a parasitic disease that affects various animals, including poultry, cattle, and goats."
          : "கொக்கிடியோசிஸ் என்பது கோழிகள், பசுக்கள் மற்றும் ஆடுகள் உட்பட பல்வேறு விலங்குகளை பாதிக்கும் பராசிட்டிக் நோயாகும்.",
      treatment:
        language === "en"
          ? "Anticoccidial drugs like amprolium or sulfadimethoxine are used to treat the disease."
          : "அம்ப்ரோலியம் அல்லது சல்பாடிமெதோக்சின் போன்ற ஆன்டிகொக்கிடியல் மருந்துகள் நோயை சிகிச்சையளிக்க பயன்படுத்தப்படுகின்றன.",
      vetDetails: [
        {
          name: "Dr. Karen Yellow",
          contact: "654-321-1230",
          address: "3232 Coccidiosis Road, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Canine Parvovirus" : "நாய் பார்வோவைரஸ்",
      description:
        language === "en"
          ? "Canine parvovirus is a viral disease affecting dogs, causing severe gastrointestinal symptoms and high mortality rates in puppies."
          : "நாய் பார்வோவைரஸ் என்பது நாய்களை பாதிக்கும் வைரஸ் நோயாகும், இது தீவிரமான குடலியல் அறிகுறிகள் மற்றும் குட்டிநாய்களில் அதிக மரண விகிதங்களை ஏற்படுத்துகிறது.",
      treatment:
        language === "en"
          ? "Supportive care including intravenous fluids is crucial for treating parvovirus in dogs."
          : "நாய்களில் பார்வோவைரஸை சிகிச்சையளிக்க உள்ளிருக்கும் திரவங்கள் உட்பட ஆதரவு பராமரிப்பு முக்கியமானது.",
      vetDetails: [
        {
          name: "Dr. Leo White",
          contact: "987-654-3210",
          address: "3333 Dog Lane, Rural Town",
        },
      ],
    },
    {
      title:
        language === "en"
          ? "Bovine Spongiform Encephalopathy"
          : "பசு ஸ்பாங்ஜிஃபார்ம் என்செபாலோபதி",
      description:
        language === "en"
          ? "Bovine spongiform encephalopathy (BSE), also known as mad cow disease, is a prion disease in cattle that can cause neurological symptoms."
          : "பசு ஸ்பாங்ஜிஃபார்ம் என்செபாலோபதி (BSE), இது பைத்தியக்கார பசு நோய் என்றும் அழைக்கப்படுகிறது, இது பசுக்களில் நரம்பியல் அறிகுறிகளை ஏற்படுத்தும் பிரியான் நோயாகும்.",
      treatment:
        language === "en"
          ? "There is no treatment, and affected animals should be culled to prevent further spread."
          : "இதற்கு சிகிச்சை எதுவும் இல்லை, மேலும் பாதிக்கப்பட்ட விலங்குகள் மேலும் பரவலைத் தடுக்க அழிக்கப்பட வேண்டும்.",
      vetDetails: [
        {
          name: "Dr. Mary Black",
          contact: "123-456-7890",
          address: "3434 BSE Road, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Lungworm Disease" : "நுரையீரல் நோய்",
      description:
        language === "en"
          ? "Lungworm disease affects livestock like cattle and sheep, causing coughing and respiratory distress."
          : "நுரையீரல் நோய் பசுக்கள் மற்றும் செம்மறியாடுகள் போன்ற மாட்டுப் பண்ணை விலங்குகளை பாதிக்கிறது, இது இருமல் மற்றும் சுவாச சிரமத்தை ஏற்படுத்துகிறது.",
      treatment:
        language === "en"
          ? "Anthelmintics such as ivermectin or albendazole are used to treat lungworm infections."
          : "நுரையீரல் புழு தொற்றுகளை சிகிச்சையளிக்க ஐவர்மெக்டின் அல்லது ஆல்பென்டசோல் போன்ற க்ரிமிநாசினிகள் பயன்படுத்தப்படுகின்றன.",
      vetDetails: [
        {
          name: "Dr.will smith",
          contact: "321-987-6740",
          address: "4131 Goat Lane, Rural Town",
        },
      ],
    },
    {
      title: language === "en" ? "Fascioliasis" : "ஃபாஸ்சியோலியாசிஸ்",
      description:
        language === "en"
          ? "Fascioliasis is a parasitic liver fluke infection affecting cattle, sheep, and other ruminants."
          : "ஃபாஸ்சியோலியாசிஸ் என்பது பசுக்கள், செம்மறியாடுகள் மற்றும் பிற மிருகங்களை பாதிக்கும் பராசிட்டிக் கல்லீரல் புழு தொற்றாகும்.",
      treatment:
        language === "en"
          ? "Anthelmintics like triclabendazole are used to treat liver fluke infections."
          : "கல்லீரல் புழு தொற்றுகளை சிகிச்சையளிக்க டிரிகிளாபென்டசோல் போன்ற க்ரிமிநாசினிகள் பயன்படுத்தப்படுகின்றன.",
      vetDetails: [
        {
          name: "Dr.Gold Smith",
          contact: "321-987-8540",
          address: "3141 Goat Lane, Rural Town",
        },
      ],
    },
  ];

  const filteredDiseases = diseases.filter((disease) =>
    disease.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTreatmentCheck = (
    treatment,
    diseaseTitle,
    description,
    vetDetails
  ) => {
    navigation.navigate("TreatmentPage", {
      treatment,
      diseaseTitle,
      description,
      vetDetails,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredDiseases}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.diseaseContainer}>
            <Text style={styles.diseaseTitle}>{item.title}</Text>
            <Text style={styles.diseaseDescription}>{item.description}</Text>
            <Button
              title={translations[language].checkTreatment}
              onPress={() =>
                handleTreatmentCheck(
                  item.treatment,
                  item.title,
                  item.description,
                  item.vetDetails
                )
              }
            />
          </View>
        )}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>{translations[language].title}</Text>
            <Text style={styles.content}>{translations[language].content}</Text>
            <TextInput
              style={styles.searchBar}
              placeholder={translations[language].searchPlaceholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </>
        }
        ListEmptyComponent={
          <Text style={styles.noDiseases}>
            {translations[language].noDiseases}
          </Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  diseaseContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  diseaseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007bff",
  },
  diseaseDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  noDiseases: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
});

export default DiseaseDescription;
