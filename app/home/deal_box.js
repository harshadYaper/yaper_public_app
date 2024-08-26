import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { router } from "expo-router";
import { Image } from "expo-image";
import { truncate } from "../utils/helper";
import { GRAY } from "../constants/colors";

export default function DealBox({
  id,
  title,
  image,
  url,
  card_meta,
  bank,
  content,
  color_code,
  color,
  disabled = false,
  price,
  quantity,
  showCancel,
  additionalStyles = {},
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderColor: "#E4E4E4",
        borderWidth: scaleWidth(2),
        borderRadius: scaleBorder(10),
        marginBottom: scaleHeight(12),
        ...styles.FLEX,
        ...scalePadding(8),
      }}
      onPress={() => router.push({ pathname: "/details", params: { id } })}
    >
      {image && (
        <View
          style={{
            ...scalePadding(4),
          }}
        >
          <Image
            contentFit={"contain"}
            source={{ uri: image }}
            style={{
              width: scaleWidth(120),
              height: scaleHeight(110),
            }}
            alt="Some image here"
          />
        </View>
      )}
      <View
        style={{
          width: "100%",
          flexShrink: 1,
        }}
      >
        {content && (
          <Text
            style={{
              ...scaleFont(12),
              fontWeight: "700",
              color: "#101828",
              ...scalePadding(4),
            }}
          >
            Earn {content}
          </Text>
        )}
        {card_meta && (
          <Text
            style={{
              ...scalePadding(4),
              ...styles.LABEL,
            }}
          >
            {card_meta}
          </Text>
        )}
        {title && (
          <Text
            style={{
              ...scaleFont(10),
              ...scalePadding(4),
              color: "#101828",
              flexShrink: 1,
              ...additionalStyles.title,
            }}
          >
            {truncate(title)}
          </Text>
        )}

        {bank && (
          <View style={styles.FLEX}>
            <Text
              style={{
                ...scalePadding(4),
                ...styles.LABEL,
              }}
            >
              Card to use
            </Text>
            <Image
              contentFit={"contain"}
              source={{ uri: bank.logo }}
              style={{ width: scaleWidth(64), height: scaleWidth(12) }}
            />
          </View>
        )}
        <View style={{ ...styles.FLEX, ...scalePadding(4) }}>
          {color_code?.includes("#") && (
            <View
              style={{
                backgroundColor: color_code,
                height: scaleHeight(12),
                width: scaleWidth(12),
                borderWidth: scaleWidth(2),
                borderRadius: scaleBorder(20),
                borderColor: GRAY,
              }}
            ></View>
          )}
          {color && (
            <Text
              style={{
                ...styles.LABEL,
                ...(color_code?.includes("#")
                  ? { paddingLeft: scaleWidth(8) }
                  : {}),
              }}
            >
              order {color.toLowerCase()}
            </Text>
          )}
        </View>

        {price && (
          <View style={{ ...styles.FLEX, ...scalePadding(4) }}>
            <Text style={styles.LABEL}>Price: </Text>
            <Text style={{ ...styles.LABEL, color: "#101828" }}>{price}</Text>
          </View>
        )}

        {quantity && (
          <View style={{ ...styles.FLEX, ...scalePadding(4) }}>
            <Text style={styles.LABEL}>Quantity: </Text>
            <Text style={{ ...styles.LABEL, color: "#101828" }}>
              {quantity}
            </Text>
          </View>
        )}

        {url && (
          <View style={{ ...scalePadding(4), ...styles.FLEX }}>
            <Text style={styles.LABEL}>Order on</Text>
            <Image
              contentFit={"contain"}
              source={{ uri: url }}
              style={{
                height: scaleHeight(16),
                width: scaleWidth(32),
                paddingLeft: scalePadding(8),
              }}
              alt="Store Image"
            />
          </View>
        )}
        {showCancel && (
          <Pressable
            style={{ ...styles.FLEX, ...scalePadding(4) }}
            onPress={() => showCancel.onCancel()}
          >
            <Text
              style={{ ...styles.LABEL, fontWeight: "500", color: "#F04438" }}
            >
              {showCancel.label}
            </Text>
          </Pressable>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  FLEX: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  LABEL: {
    ...scaleFont(10),
    color: "#667085",
  },
});
