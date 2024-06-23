import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import i18n from "i18next";
import { Trans, initReactI18next, useTranslation } from "react-i18next";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: `Hola amigo! Welcome to our Language Learning Club! Your purchase of our flashcards shows your dedication to your language learning goals, so we'd like to offer you our exclusive E-Practice booklet to help you accomplish your goal faster! This booklet is tailored to fit any language level and is not available on the market yet! You are the first to get your hands on it.
        `,
        langQues: `What language are you mastering?`,
        langPara: "We will use this to match you with the right lesson plan.",
        langOption: "Select a language",
        levelQues: "What level would you place yourself?",
        levelPara:
          "We will use this information to build products to meet your future needs.",
        levelOption: "Select a level",
        name: "What do we call you language lover!?",
        email: "What is your best email?",
        emailPara:
          "We will use it to send you, your E- PRACTICE BOOKLET, Promo codes, and new innovative Learning tips",
        orderQues: "What is your order ID?",
        orderPara:
          "Here is the steps to how you can find your order ID swipe arrow to see steps screenshots --->",
        setQues: "Which study key set are you learning with?",
        thankYou: "Thank you",
        thankYouP1:
          "You inspire the new generation to be at their best and taking this huge leap towards your learning journey shows that! We will email you, your FREE E-PRACTICE BOOKLET!",
        thankYouP2:
          "In the mean time practice makes perfect visit our website at Studykey.ca to check out our flashcard line.",
        findOrder: "How to find your Order ID",
        step1:
          "<1>Step 1</1> Log in to your Amazon account, at the bottom click icon.",
        step2: "<1>Step 2</1> under your account name click 'your orders'",
        step3: "<1>Step 3</1> Find your order and click on it ",
        step4: "<1>Step 4</1> scroll down Click 'View Order details'.",
        step5: "<1>Step 5</1> You will see your order ID.",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        english: "English",
        spanish: "Spanish",
      },
    },
    es: {
      translation: {
        welcome: `¡Hello friend! ¡Bienvenido a nuestro Club de Aprendizaje de Idiomas! Tu compra de nuestras tarjetas educativas muestra tu dedicación a tus metas de aprendizaje de idiomas, por lo que nos gustaría ofrecerte nuestro exclusivo cuadernillo electrónico de práctica para ayudarte a alcanzar tu objetivo más rápido. Este cuadernillo está adaptado para cualquier nivel de idioma y aún no está disponible en el mercado. ¡Tú eres el primero en tenerlo en tus manos!
        `,
        langQues: `¿Qué idioma estás dominando?`,
        langPara:
          "Lo utilizaremos para emparejarte con el plan de lecciones adecuado.",
        langOption: "Selecciona un idioma",
        levelQues: "¿En qué nivel te situarías?",
        levelPara:
          "Utilizaremos esta información para crear productos que satisfagan tus necesidades futuras.",
        levelOption: "Selecciona un nivel",
        name: "¡Cómo te llamamos, amante de los idiomas!?",
        email: "¿Cuál es tu mejor correo electrónico?",
        emailPara: `"Lo utilizaremos para enviarte tu CUADERNILLO ELECTRÓNICO DE PRÁCTICA, códigos promocionales y nuevos consejos innovadores para el aprendizaje.
        "`,
        orderQues: "¿Cuál es tu ID de pedido?",
        orderPara:
          "Aquí están los pasos sobre cómo puedes encontrar tu ID de pedido --->",
        setQues: "¿Con qué conjunto de Study Key estás aprendiendo?",
        thankYou: "¡Gracias",
        thankYouP1: `Inspiras a la nueva generación a dar lo mejor de sí misma y ¡este gran paso hacia tu viaje de aprendizaje lo demuestra!
Te enviaremos por correo electrónico tu FOLLETO DE E-PRÁCTICA GRATIS.`,
        thankYouP2:
          "Mientras tanto, la práctica hace al maestro. Visita nuestro sitio web en Studykey.ca para ver nuestra línea de tarjetas didácticas.",
        step1:
          "<1>Paso 1 :</1> Inicia sesión en tu cuenta de Amazon, en la parte inferior haz clic en este ícono.",
        step2:
          "<1>Paso 2 :</1> bajo el nombre de tu cuenta haz clic en “tus pedidos”.",
        step3: "<1>Paso 3</1> Encuentra tu pedido y haz clic en él.",
        step4:
          "<1>Paso 4</1> desplázate hacia abajo y haz clic en “Ver detalles del pedido.",
        step5: "<1>Paso 5</1> Verás tu ID de pedido.",
        beginner: "Principiante",
        intermediate: "Intermedio",
        advanced: "Avanzado",
        english: "Inglés",
        spanish: "Español",
      },
    },
    // Add more languages here
  },
  lng: "es", // Default language
  fallbackLng: "en", // Use English if the language can't be detected
  interpolation: { escapeValue: false },
});

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    language: "",

    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [language, setLanguage] = useState("es");

  useEffect(() => {
    async function fetchLocationAndSetLanguage() {
      try {
        const response = await axios.get(
          "https://studykey-riddles-server.vercel.app/api/location"
        );
        const geo = response.data;
        const language = getLanguageFromCountryCode(geo.country); // Implement this function
        setLanguage(language);
        i18n.changeLanguage(language);
      } catch (error) {
        console.error("Failed to fetch location or set language:", error);
      }
    }
    fetchLocationAndSetLanguage();
  }, []);

  function getLanguageFromCountryCode(countryCode) {
    // Map country codes to languages
    const countryToLanguage = {
      US: "en",
      ES: "es",
      // Add more countries here
    };
    return countryToLanguage[countryCode] || "en"; // Default to English
  }

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
    setLanguage(event.target.value);
  };

  const nextStep = () => {
    let newErrors = {
      language: "",

      name: "",
      email: "",
    };

    // Validation logic
    if (formData.language === "" && step === 1) {
      newErrors.language = "Please select an option for the language.";
    }

    if (formData.name === "" && step === 1) {
      newErrors.name = "Please fill in the name field.";
    }
    if (formData.email === "" && step === 1) {
      newErrors.email = "Please fill in the email field.";
    }

    setErrors(newErrors);

    // If all checks pass, proceed to the next step
    if (!newErrors.language && !newErrors.name && !newErrors.email) {
      setStep(step + 1);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    {
      const submitReviewPromise = axios.post(
        "https://studykey-riddles-server.vercel.app/submit-review",
        formData
      );

      const wrappedPromise = new Promise((resolve, reject) => {
        submitReviewPromise
          .then((data) => {
            setStep(step + 1);
            resolve(data);
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 409) {
                // Duplicate order ID error
                toast.error(error.response.data.message);
              } else if (error.response.status === 400) {
                // Invalid order ID error
                toast.error(
                  "Order ID doesn't match. Please make sure to put the correct Amazon order ID!"
                );
              } else {
                // Other errors
                console.error(error);
              }
            } else {
              // Network error or other error occurred without a response
              console.error(error);
            }
            reject(error);
          });
      });

      toast.promise(wrappedPromise, {
        loading: "Please wait",
        success: "Success",
        error: "An error occurred while submitting the claim.",
      });
    }
  };

  return (
    <div className="min-h-screen items-center bg-blueBG w-full text-blueText overflow-x-hidden">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          loading: {
            duration: Infinity,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div className="">
        {step === 1 && (
          <div className="flex flex-col-reverse md:flex-row items-center md:items-start">
            <div className="w-full container mx-auto px-5 flex flex-col items-center box-content max-h-screen overflow-y-scroll no-scrollbar">
              <div className="flex flex-col items-center gap-5 sm:gap-5 md:gap-7 w-full">
                <div className="flex gap-5 mt-2 items-center">
                  <img src={"Logo.png"} alt="logo" className="w-20 h-20" />
                  <select
                    value={language}
                    onChange={changeLanguage}
                    className="border-2 
                    bg-myOrange text-white p-2 rounded-md"
                  >
                    <option value="en">{t("english")}</option>
                    <option value="es">{t("spanish")}</option>
                  </select>
                </div>
                <span className="font-rasputin text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  Congratulations!
                </span>
                <p className="text-center mx-auto text-lg md:text-xl lg:text-2xl font-now">
                  {t("welcome")}
                </p>
                <div className="p-3">
                  <form>
                    <label className="block mt-2 w-full">
                      <span className="uppercase font-semibold text-lg sm:text-xl md:text-2xl ">
                        {t("langQues")}
                      </span>
                      <br></br>
                      <span className="text-sm sm:text-base md:text-lg font-normal italic">
                        {t("langPara")}
                      </span>
                      <select
                        id="myInput"
                        name="language"
                        value={formData.language}
                        required
                        onChange={handleChange}
                        className="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-blueInput p-3 text-lg sm:text-xl md:text-2xlplaceholder:text-blueText placeholder:opacity-50 placeholder:text-2xl"
                      >
                        <option value="">{t("langOption")}</option>
                        <option value="English">{t("english")}</option>
                        <option value="Spanish">{t("spanish")}</option>
                      </select>
                      {errors.language && (
                        <div className="text-red-500">{errors.language}</div>
                      )}
                    </label>
                    <label className="block mb-5 w-full mt-5">
                      <label className="block mt-4 w-full">
                        <span className="uppercase font-semibold text-lg sm:text-xl md:text-2xl ">
                          {t("name")}
                        </span>

                        <input
                          id="myInput"
                          type="text"
                          name="name"
                          value={formData.name}
                          required
                          placeholder={`"John"`}
                          onChange={handleChange}
                          className="mt-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-blueInput p-3 text-lg sm:text-xl md:text-2xl lg:text-3xl placeholder:text-blueText placeholder:opacity-50 placeholder:text-2xl"
                        />
                        {errors.name && (
                          <div className="text-red-500">{errors.name}</div>
                        )}
                      </label>
                      <label className="block mb-5 w-full mt-10">
                        <span className="uppercase font-semibold text-lg sm:text-xl md:text-2xl ">
                          {t("email")}
                        </span>
                        <br></br>
                        <span className="text-sm sm:text-base md:text-lg  font-normal italic">
                          {t("emailPara")}
                        </span>

                        <input
                          id="myInput"
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={`"john@email.com"`}
                          className="mt-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-blueInput p-3 text-lg sm:text-xl md:text-2xl lg:text-3xl placeholder:text-blueText placeholder:opacity-50 placeholder:text-2xl"
                        />

                        {errors.email && (
                          <div className="text-red-500">{errors.email}</div>
                        )}
                      </label>
                    </label>
                  </form>
                </div>
              </div>

              <div className="">
                <button
                  className="bg-blueInput hover:bg-blue-700 text-white font-bold py-3 px-4 text-2xl rounded "
                  onClick={handleSubmit}
                >
                  {" "}
                  Next{" "}
                </button>
              </div>
            </div>
            <div className="h-screen w-[70%]">
              {language === "en" ? (
                <img
                  src="spanish-book-1.png"
                  alt="rewardphoto"
                  className="w-full h-full object-fill"
                />
              ) : (
                <img
                  src="English-book-1.png"
                  alt="rewardphoto"
                  className="w-full h-full object-fill"
                />
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex items-center justify-center h-screen ">
            <div className="flex-1 p-10 flex-col gap-5 flex">
              <h1 className="text-6xl text-center font-rasputin">
                {t("thankYou")}
                <br></br>
                <span className="uppercase">{formData.name}!</span>
              </h1>

              <p className="text-3xl text-center font-light">
                {t("thankYouP1")}
              </p>

              <p className="text-3xl text-center font-light">
                {t("thankYouP2")}
              </p>
            </div>
            <div className="h-full max-w-[1100px]">
              <img
                src="/thankyou.png"
                className="w-full h-full"
                alt="thankyou"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
