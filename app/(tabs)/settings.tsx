import {
  Image,
  Text,
  FlatList,
  Switch,
  View,
  Pressable,
  Modal,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import tw from "@/twrnc-config";
import CustomCard from "@/components/CustomCard";
import { icons, images } from "@/constants";
import { Redirect, router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CountryFlag from "react-native-country-flag";
import { Asset } from "expo-asset";
import { useEffect } from "react";
import i18n from "@/i18n/i18n";
import { useTranslation } from "react-i18next";

interface Isettings {
  id: string;
  settingicon: JSX.Element;
  setting: string;
}

const settings: Isettings[] = [
  {
    id: "sound",
    settingicon: <icons.SpeakerHigh />,
    setting: "Sound",
  },
  {
    id: "notification",
    settingicon: <icons.BellIcon />,
    setting: "Push notification",
  },
  {
    id: "suggestions",
    settingicon: <icons.Suggestion />,
    setting: "Make suggestions",
  },
  {
    id: "privacypolicy",
    settingicon: <icons.LockKey />,
    setting: "Privacy & Policy",
  },
  {
    id: "terms",
    settingicon: <icons.PencilLine />,
    setting: "Terms & Conditions",
  },
  {
    id: "support",
    settingicon: <icons.QuestionIcon />,
    setting: "Support",
  },
  {
    id: "About",
    settingicon: <icons.InfoIcon />,
    setting: "about",
  },
];

// Preload function
const preloadFlagImages = () => {
  const flagUrls = [
    "https://flagcdn.com/w320/fr.png",
    "https://flagcdn.com/w320/es.png",
    "https://flagcdn.com/w320/de.png",
    "https://flagcdn.com/w320/us.png",
    "https://flagcdn.com/w320/cn.png",
    "https://flagcdn.com/w320/ru.png",
    "https://flagcdn.com/w320/gb.png",
  ];
  flagUrls.forEach((url) => {
    Image.prefetch(url);
  });
};

export default function Settings() {
  const [soundSwitch, setSoundSwitch] = useState(false);
  const [notificationSwitch, setNotificationSwitch] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState<{
    label: string;
    countryCode: string;
  } | null>(null);
  const [top, setTop] = useState(0);
  // const btnRef = useRef(null);
  const { t } = useTranslation();

  const toggleSoundSwitch = () => {
    setSoundSwitch((prevState) => !prevState);
  };
  const toggleNotificationSwitch = () => {
    setNotificationSwitch((prevState) => !prevState);
  };
  const handleClickChange = (item: Isettings) => {
    if (item.id === "suggestions") {
      router.push("/suggestions");
    } else if (item.id === "privacypolicy") {
      router.push("/policy");
    } else if (item.id === "terms") {
      router.push("/terms");
    } else if (item.id === "support") {
      router.push("/support");
    }
  };

  const toggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const onSelect = useCallback(
    (item: { label: string; value: string; countryCode: string }) => {
      setSelected({ label: item.label, countryCode: item.countryCode });
      // i18n.changeLanguage(item.value);
      setIsExpanded(false);
    },
    []
  );

  useEffect(() => {
    // Preload flags when the component mounts
    preloadFlagImages();
  }, []);

  return (
    <ThemedView style={tw`w-full flex-1 px-5`}>
      <SafeAreaView style={tw`w-full gap-5 flex-1`}>
        <Pressable
          onPress={() => router.back()}
          style={tw`pt-5 flex-row justify-start`}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </Pressable>
        <View style={tw`flex-1`}>
          <ThemedText style={tw`mb-5 text-4xl font-medium w-70`}>
            Settings
          </ThemedText>

          <ThemedText style={tw`font-medium mb-2 px-1`}>Language</ThemedText>

          <Pressable
            style={({ pressed }) => [
              tw`w-full justify-between bg-primary border border-[#EAE8EE] mb-5 relative rounded-xl flex-row p-4`,
              pressed && tw`opacity-70`,
            ]}
            onPress={toggleExpanded}
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              const topOffset = layout.y;
              const heightOfComponent = layout.height;
              const extraPadding = 110;
              setTop(topOffset + heightOfComponent + extraPadding);
            }}
          >
            <View style={tw`flex-row items-center`}>
              {selected ? (
                <>
                  <CountryFlag
                    isoCode={selected.countryCode}
                    size={20}
                    style={tw`mr-2`}
                  />
                  <Text>{selected.label}</Text>
                </>
              ) : (
                <Text>Select Language</Text>
              )}
            </View>
            <MaterialIcons
              name={isExpanded ? "keyboard-arrow-down" : "keyboard-arrow-right"}
              size={24}
              color="black"
            />
          </Pressable>

          {isExpanded && (
            <Modal
              transparent={true}
              animationType="fade"
              onRequestClose={toggleExpanded}
            >
              <Pressable
                style={tw`absolute inset-0 bg-transparent`}
                onPress={toggleExpanded}
              >
                <View
                  style={[
                    tw`absolute bg-primary rounded-[8px] w-[200px] p-5`,
                    {
                      top: top,
                      right: 30,
                      zIndex: 1000,
                      shadowColor: "#000",
                      shadowOffset: { width: 4, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 10,
                      elevation: 6,
                    },
                  ]}
                >
                  <FlatList
                    data={[
                      {
                        label: "Francais",
                        value: "fr",
                        countryCode: "FR",
                      },
                      {
                        label: "Espanyol",
                        value: "es",
                        countryCode: "ES",
                      },
                      {
                        label: "German",
                        value: "de",
                        countryCode: "DE",
                      },
                      {
                        label: "English US",
                        value: "en",
                        countryCode: "US",
                      },
                      {
                        label: "Chinese",
                        value: "cn",
                        countryCode: "CN",
                      },
                      {
                        label: "Russian",
                        value: "ru",
                        countryCode: "RU",
                      },
                      {
                        label: "English UK",
                        value: "gb",
                        countryCode: "GB",
                      },
                    ]}
                    keyExtractor={(item) => item.value}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={tw`h-1`} />}
                    renderItem={({ item }) => (
                      <Pressable
                        style={({ pressed }) => [
                          tw`h-[40px] items-center flex-row gap-2`,
                          pressed && tw`opacity-70`,
                        ]}
                        onPress={() => onSelect(item)}
                      >
                        <View
                          style={tw`rounded-lg overflow-hidden h-[30px] w-[45px]`}
                        >
                          <CountryFlag isoCode={item.countryCode} size={30} />
                        </View>
                        <Text>{item.label}</Text>
                      </Pressable>
                    )}
                  />
                </View>
              </Pressable>
            </Modal>
          )}

          <FlatList
            data={settings}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={tw`mb-3`}>
                <CustomCard
                  icon={
                    item.id === "sound" && soundSwitch ? (
                      <icons.SpeakerHigh />
                    ) : item.id === "sound" ? (
                      <SimpleLineIcons
                        name="volume-off"
                        size={24}
                        color="black"
                      />
                    ) : (
                      item.settingicon
                    )
                  }
                  title={item.setting}
                  otherStyles="bg-gray-DEFAULT"
                  opacityStyle={
                    item.id === "sound"
                      ? "opacity-100"
                      : item.id === "notification"
                      ? "opacity-100"
                      : ""
                  }
                  handleClick={() => handleClickChange(item)}
                  textoricon={
                    item.id === "sound" ? (
                      <Switch
                        value={soundSwitch}
                        onValueChange={toggleSoundSwitch}
                        trackColor={{ false: "#E5E7EB", true: "#8D0CCA" }}
                      />
                    ) : item.id === "notification" ? (
                      <Switch
                        value={notificationSwitch}
                        onValueChange={toggleNotificationSwitch}
                        trackColor={{ false: "#E5E7EB", true: "#8D0CCA" }}
                        focusable={false}
                      />
                    ) : undefined
                  }
                />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
