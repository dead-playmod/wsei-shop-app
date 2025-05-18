import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useUser } from '@/hooks/useUser';
import { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  useColorScheme,
  View,
} from 'react-native';

function UserPanel() {
  const destructiveColor = useThemeColor({}, 'destructive');
  const textMutedColor = useThemeColor({}, 'textMuted');
  const backgroundMuted = useThemeColor({}, 'backgroundMuted');
  const borderColor = useThemeColor({}, 'border');

  const theme = useColorScheme();

  const { user, logout } = useUser();

  const onLogout = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            ToastAndroid.show('Logged out', ToastAndroid.SHORT);
          },
        },
      ],
      { userInterfaceStyle: theme === 'dark' ? 'dark' : 'light' }
    );
  }, []);

  const sectionStyles = [
    styles.userSection,
    {
      borderColor,
      backgroundColor: backgroundMuted,
    },
  ];

  const sectionData = useMemo(
    () => [
      {
        label: 'Email',
        value: user?.email,
      },
      {
        label: 'Phone',
        value: user?.phone,
      },
      {
        label: 'Address',
        value: `${user?.address.address}, ${user?.address.city}, ${user?.address.state}, ${user?.address.postalCode}, ${user?.address.country}`,
      },
      {
        label: 'Company',
        value: user?.company.name,
      },
      {
        label: 'University',
        value: user?.university,
      },
    ],
    []
  );

  return (
    <ThemedView style={styles.user}>
      <View
        style={[
          ...sectionStyles,
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}
      >
        <Image
          source={{ uri: user?.image }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />

        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <ThemedText type="title" style={{ textAlign: 'left', fontSize: 24 }}>
            {user?.firstName} {user?.lastName}
          </ThemedText>

          <ThemedText
            type="default"
            style={{ textAlign: 'center', color: textMutedColor }}
          >
            {user?.username}
          </ThemedText>
        </View>
      </View>

      <View style={sectionStyles}>
        {sectionData.map((section) => (
          <View
            key={section.label}
            style={{
              gap: 2,
            }}
          >
            <ThemedText type="defaultSemiBold">{section.label}</ThemedText>
            <ThemedText type="default" style={{ color: textMutedColor }}>
              {section.value}
            </ThemedText>
          </View>
        ))}
      </View>

      <Button title="Logout" color={destructiveColor} onPress={onLogout} />
    </ThemedView>
  );
}

function UserLogin() {
  const textColor = useThemeColor({}, 'text');
  const textMutedColor = useThemeColor({}, 'textMuted');
  const backgroundMuted = useThemeColor({}, 'backgroundMuted');
  const borderColor = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, isPending } = useUser();

  const send = async () => {
    try {
      await login({ username, password });
      ToastAndroid.show('Login successful', ToastAndroid.SHORT);
    } catch (error) {
      Alert.alert('Login failed', 'Invalid username or password');
    }
  };

  return (
    <ThemedView style={styles.login}>
      <ThemedText
        type="title"
        style={{ textAlign: 'center', paddingBlock: 16 }}
      >
        Login
      </ThemedText>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={[
          styles.input,
          {
            backgroundColor: backgroundMuted,
            color: textColor,
            borderColor,
          },
        ]}
        placeholderTextColor={textMutedColor}
        autoComplete="username"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[
          styles.input,
          {
            backgroundColor: backgroundMuted,
            color: textColor,
            borderColor,
          },
        ]}
        placeholderTextColor={textMutedColor}
        autoComplete="password"
        autoCapitalize="none"
      />

      <View style={{ marginTop: 16, gap: 16 }}>
        <Button
          title="login"
          color={tint}
          disabled={isPending}
          onPress={send}
        />

        <Button
          title="autofill"
          color={borderColor}
          onPress={() => {
            setUsername('emilys');
            setPassword('emilyspass');
          }}
        />
      </View>
    </ThemedView>
  );
}

export default function UserScreen() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        {user ? <UserPanel /> : <UserLogin />}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 16,
    paddingBlock: 64,
    gap: 16,
  },
  login: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    paddingBlock: 64,
  },
  input: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  user: {
    flex: 1,
    gap: 32,
  },
  userSection: {
    gap: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
});
