import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, type ComponentProps } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	type TextInputProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type IconName = ComponentProps<typeof Ionicons>['name'];

type ProfileFieldProps = {
	label: string;
	value: string;
	placeholder: string;
	onChangeText: NonNullable<TextInputProps['onChangeText']>;
	icon: IconName;
	keyboardType?: TextInputProps['keyboardType'];
	autoCapitalize?: TextInputProps['autoCapitalize'];
	multiline?: boolean;
};

function ProfileField({
	label,
	value,
	placeholder,
	onChangeText,
	icon,
	keyboardType,
	autoCapitalize = 'sentences',
	multiline = false,
}: ProfileFieldProps) {
	return (
		<View style={styles.field}>
			<Text style={styles.fieldLabel}>{label}</Text>
			<View style={[styles.fieldControl, multiline && styles.fieldControlMultiline]}>
				<Ionicons color="#b5c9be" name={icon} size={18} />
				<TextInput
				autoCapitalize={autoCapitalize}
				keyboardType={keyboardType}
				multiline={multiline}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor="#91a79b"
				selectionColor="#f2a184"
				style={[styles.fieldInput, multiline && styles.fieldInputMultiline]}
				textAlignVertical={multiline ? 'top' : 'center'}
				value={value}
				/>
			</View>
		</View>
	);
}

export default function LoginScreen() {
	const [name, setName] = useState('Tu nombre y apellido');
	const [profession, setProfession] = useState('Tu profesión o especialidad');
	const [bio, setBio] = useState('Escribe una frase breve que cuente qué te mueve.');
	const [email, setEmail] = useState('hola@tucorreo.com');
	const [city, setCity] = useState('Tu ciudad, tu país');
	const [isEditing, setIsEditing] = useState(true);

	const initials = name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((word) => word.charAt(0).toUpperCase())
		.join('') || 'TN';

	return (
		<SafeAreaView style={styles.safeArea}>
			<LinearGradient
				colors={['#122722', '#203c32', '#182721']}
				end={{ x: 1, y: 1 }}
				start={{ x: 0, y: 0 }}
				style={styles.background}
			>
				<View style={[styles.decorations, styles.noPointerEvents]}>
					<View style={styles.topRibbon} />
					<View style={styles.bottomRibbon} />
				</View>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : undefined}
					style={styles.keyboardView}
				>
					<ScrollView
						contentContainerStyle={styles.page}
						keyboardShouldPersistTaps="handled"
						showsVerticalScrollIndicator={false}
					>
						<View style={styles.content}>
							<View style={styles.eyebrowRow}>
								<Ionicons color="#ef9b7d" name="sparkles-outline" size={16} />
								<Text style={styles.eyebrow}>IDENTIDAD PERSONAL / 01</Text>
							</View>
							<Text style={styles.pageTitle}>Una tarjeta que habla por ti.</Text>
							<Text style={styles.pageDescription}>
								Tu perfil, tus palabras. Edita los datos y mira cómo cambia al instante.
							</Text>

							<View style={styles.sectionHeading}>
								<Text style={styles.sectionLabel}>VISTA PREVIA</Text>
								<View style={styles.liveIndicator}>
									<View style={styles.liveDot} />
									<Text style={styles.liveText}>EN VIVO</Text>
								</View>
							</View>

							<View style={styles.cardFrame}>
								<BlurView intensity={48} tint="dark" style={styles.profileCard}>
									<View style={styles.cardTopline}>
										<Text style={styles.cardEyebrow}>TARJETA DE PRESENTACIÓN</Text>
										<Ionicons color="#f1a184" name="aperture-outline" size={20} />
									</View>
									<View style={styles.identityRow}>
										<LinearGradient
											colors={['#f1a184', '#d36c50']}
											end={{ x: 1, y: 1 }}
											start={{ x: 0, y: 0 }}
											style={styles.avatar}
										>
											<Text style={styles.avatarText}>{initials}</Text>
										</LinearGradient>
										<View style={styles.identityText}>
											<Text numberOfLines={2} style={styles.profileName}>
												{name || 'Tu nombre'}
											</Text>
											<Text numberOfLines={2} style={styles.profileProfession}>
												{profession || 'Tu especialidad'}
											</Text>
										</View>
									</View>
									<View style={styles.cardRule} />
									<View style={styles.bioRow}>
										<Ionicons color="#f1a184" name="chatbubble-ellipses-outline" size={19} />
										<Text style={styles.profileBio}>{bio || 'Tu historia empieza aqui.'}</Text>
									</View>
									<View style={styles.contactRow}>
										<View style={styles.contactItem}>
											<Ionicons color="#f1a184" name="mail-outline" size={15} />
											<Text numberOfLines={1} style={styles.contactText}>
												{email || 'tu@email.com'}
											</Text>
										</View>
										<View style={styles.contactItem}>
											<Ionicons color="#f1a184" name="location-outline" size={15} />
											<Text numberOfLines={1} style={styles.contactText}>
												{city || 'Tu ubicacion'}
											</Text>
										</View>
									</View>
								</BlurView>
							</View>

							<View style={styles.editorHeading}>
								<View>
									<Text style={styles.sectionLabel}>PERSONALIZA</Text>
									<Text style={styles.editorTitle}>Tu presentación</Text>
								</View>
								<Pressable
									accessibilityLabel={isEditing ? 'Ocultar editor' : 'Editar perfil'}
									accessibilityRole="button"
									onPress={() => setIsEditing(!isEditing)}
									style={styles.editButton}
								>
									<Ionicons
										color="#172720"
										name={isEditing ? 'checkmark' : 'create-outline'}
										size={17}
									/>
									<Text style={styles.editButtonText}>{isEditing ? 'Listo' : 'Editar'}</Text>
								</Pressable>
							</View>

							{isEditing && (
								<View style={styles.form}>
									<ProfileField
										autoCapitalize="words"
										icon="person-outline"
										label="Nombre"
										onChangeText={setName}
										placeholder="Tu nombre y apellido"
										value={name}
									/>
									<ProfileField
										icon="briefcase-outline"
										label="Profesión o especialidad"
										onChangeText={setProfession}
										placeholder="A qué te dedicas"
										value={profession}
									/>
									<ProfileField
										icon="chatbubble-ellipses-outline"
										label="Sobre ti"
										multiline
										onChangeText={setBio}
										placeholder="Qué te gustaría que sepan de ti"
										value={bio}
									/>
									<ProfileField
										autoCapitalize="none"
										icon="mail-outline"
										keyboardType="email-address"
										label="Correo de contacto"
										onChangeText={setEmail}
										placeholder="hola@tucorreo.com"
										value={email}
									/>
									<ProfileField
										icon="location-outline"
										label="Ubicación"
										onChangeText={setCity}
										placeholder="Ciudad, país"
										value={city}
									/>
								</View>
							)}

							<Text style={styles.footerNote}>
								<Ionicons color="#f1a184" name="lock-closed-outline" size={13} />
								{'  '}Tus cambios se reflejan en la tarjeta al instante.
							</Text>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#122722',
	},
	background: {
		flex: 1,
	},
	keyboardView: {
		flex: 1,
	},
	decorations: {
		...StyleSheet.absoluteFillObject,
		overflow: 'hidden',
	},
	noPointerEvents: {
		pointerEvents: 'none',
	},
	topRibbon: {
		position: 'absolute',
		top: 128,
		right: -120,
		width: 300,
		height: 110,
		borderWidth: 1,
		borderColor: 'rgba(241, 161, 132, 0.24)',
		transform: [{ rotate: '-32deg' }],
	},
	bottomRibbon: {
		position: 'absolute',
		bottom: 90,
		left: -145,
		width: 290,
		height: 80,
		borderWidth: 1,
		borderColor: 'rgba(181, 201, 190, 0.16)',
		transform: [{ rotate: '-32deg' }],
	},
	page: {
		flexGrow: 1,
		paddingHorizontal: 22,
		paddingTop: 28,
		paddingBottom: 48,
	},
	content: {
		width: '100%',
		maxWidth: 620,
		alignSelf: 'center',
	},
	eyebrowRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 12,
	},
	eyebrow: {
		color: '#f1a184',
		fontSize: 11,
		fontWeight: '700',
	},
	pageTitle: {
		maxWidth: 420,
		color: '#f1f3e8',
		fontFamily: 'Georgia',
		fontSize: 32,
		fontWeight: '700',
		lineHeight: 38,
	},
	pageDescription: {
		maxWidth: 390,
		marginTop: 9,
		color: '#b8c9be',
		fontSize: 14,
		lineHeight: 21,
	},
	sectionHeading: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 27,
		marginBottom: 11,
	},
	sectionLabel: {
		color: '#b4c7bc',
		fontSize: 10,
		fontWeight: '700',
	},
	liveIndicator: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	liveDot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: '#c7db89',
	},
	liveText: {
		color: '#d2ddc2',
		fontSize: 10,
		fontWeight: '700',
	},
	cardFrame: {
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.28)',
		borderRadius: 18,
		overflow: 'hidden',
		backgroundColor: 'rgba(255, 255, 255, 0.08)',
	},
	profileCard: {
		minHeight: 274,
		padding: 20,
		backgroundColor: 'rgba(255, 255, 255, 0.09)',
	},
	cardTopline: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	cardEyebrow: {
		color: '#d8e1d8',
		fontSize: 10,
		fontWeight: '700',
	},
	identityRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 15,
	},
	avatar: {
		width: 68,
		height: 68,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 18,
	},
	avatarText: {
		color: '#fffaf2',
		fontSize: 21,
		fontWeight: '700',
	},
	identityText: {
		flex: 1,
		minWidth: 0,
	},
	profileName: {
		color: '#f5f5ec',
		fontFamily: 'Georgia',
		fontSize: 24,
		fontWeight: '700',
	},
	profileProfession: {
		marginTop: 5,
		color: '#c3d3c8',
		fontSize: 13,
		lineHeight: 18,
	},
	cardRule: {
		height: 1,
		marginVertical: 17,
		backgroundColor: 'rgba(255, 255, 255, 0.18)',
	},
	bioRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 10,
		marginBottom: 18,
	},
	profileBio: {
		flex: 1,
		color: '#e6ece4',
		fontSize: 13,
		lineHeight: 19,
	},
	contactRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
	},
	contactItem: {
		flex: 1,
		minWidth: 145,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 7,
	},
	contactText: {
		flexShrink: 1,
		color: '#d4dfd5',
		fontSize: 11,
	},
	editorHeading: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 28,
		marginBottom: 15,
	},
	editorTitle: {
		marginTop: 4,
		color: '#f1f3e8',
		fontFamily: 'Georgia',
		fontSize: 21,
		fontWeight: '700',
	},
	editButton: {
		minHeight: 38,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 6,
		borderRadius: 6,
		paddingHorizontal: 13,
		backgroundColor: '#c7db89',
	},
	editButtonText: {
		color: '#172720',
		fontSize: 13,
		fontWeight: '700',
	},
	form: {
		gap: 14,
	},
	field: {
		gap: 7,
	},
	fieldLabel: {
		color: '#d3ded5',
		fontSize: 12,
		fontWeight: '600',
	},
	fieldControl: {
		minHeight: 48,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		borderWidth: 1,
		borderColor: 'rgba(221, 237, 226, 0.22)',
		borderRadius: 7,
		paddingHorizontal: 13,
		backgroundColor: 'rgba(255, 255, 255, 0.055)',
	},
	fieldControlMultiline: {
		minHeight: 92,
		alignItems: 'flex-start',
		paddingTop: 13,
	},
	fieldInput: {
		flex: 1,
		minHeight: 46,
		paddingVertical: 9,
		color: '#f1f3e8',
		fontSize: 14,
	},
	fieldInputMultiline: {
		minHeight: 66,
		paddingTop: 0,
	},
	footerNote: {
		marginTop: 19,
		color: '#aebfb3',
		fontSize: 11,
		lineHeight: 17,
	},
});
